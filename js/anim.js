/* Sebulur - 平滑捲動與進場動畫 */
/* Version: 1.0.0 */

(function () {
    'use strict';

    var HEADER_OFFSET = -80; // 固定頁首高度
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lenis = null;

    // ── 平滑捲動 ──
    if (!reduceMotion && typeof window.Lenis === 'function') {
        lenis = new window.Lenis({
            duration: 1.05,
            easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
            smoothWheel: true,
            touchMultiplier: 1.6
        });

        (function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        })(0);
    }

    // 其他程式可呼叫：window.smoothScrollTo(目標, 位移)
    window.smoothScrollTo = function (target, offset) {
        if (lenis) {
            lenis.scrollTo(target, { offset: offset || 0 });
            return;
        }
        if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: 'smooth' });
            return;
        }
        var el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // ── 站內錨點連結 ──
    document.addEventListener('click', function (e) {
        var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
        if (!link) return;

        var hash = link.getAttribute('href');
        if (!hash || hash === '#' || hash.length < 2) return;

        var el = document.querySelector(hash);
        if (!el) return;

        e.preventDefault();
        window.smoothScrollTo(el, HEADER_OFFSET);
    });

    // ── 進場動畫 ──
    function initReveal() {
        // 群組內的元素依序延遲
        document.querySelectorAll('[data-stagger]').forEach(function (group) {
            group.querySelectorAll('[data-reveal]').forEach(function (el, i) {
                el.style.setProperty('--reveal-delay', (i * 0.06).toFixed(2) + 's');
            });
        });

        var items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el.classList.add('is-visible');
                observer.unobserve(el);
                el.addEventListener('transitionend', function handler() {
                    el.classList.add('is-settled');
                    el.removeEventListener('transitionend', handler);
                });
            });
        }, { threshold: 0, rootMargin: '0px 0px 18% 0px' });

        items.forEach(function (el) { observer.observe(el); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();
