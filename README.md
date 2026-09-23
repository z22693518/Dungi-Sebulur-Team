# Sebulur - DJ 團隊官方網站

專業 DJ 團隊網站，結合原住民文化與現代電子音樂。

🌐 **線上網址**：[https://z22693518.github.io/Dungi-Sebulur-Team/](https://z22693518.github.io/Dungi-Sebulur-Team/)

## 團隊成員

| DJ | 曲風 | 特色 |
|---|---|---|
| **REDSHOU** | EDM、Hip-Hop | 花蓮阿美族，台北 OMNI ALTA 駐場 |
| **Visin** | Disco、Amapiano | 花蓮阿美族，原民元素融合電子節奏 |
| **Dinos** | Hip-Hop、R&B | 派對與品牌活動演出 |
| **DINOjin** | Melodic House、Peak House | 4 軌放歌技術，台中 PinkB 駐店 |
| **AT** | Funk Disco、Old School Hip-Hop | 「pa在路上」主理人，街舞賽事 Battle DJ |

## 網站結構

```
Dungi-Sebulur-Team/
├── index.html            # 首頁（單頁式：關於／服務／特色／演出／相簿／聯絡）
├── services.html         # 服務項目（四大類別、服務流程、報價方式）
├── artists.html          # DJ 陣容（滑過浮出資訊，點擊進個人頁）
├── djs/
│   ├── dj1.html          # REDSHOU
│   ├── dj2.html          # Visin
│   ├── dj3.html          # Dinos
│   ├── dj4.html          # DINOjin
│   └── dj5.html          # AT
├── 404.html
├── index-personal.html   # 舊網址導向頁（轉往 index.html）
├── css/
│   ├── main.css          # 主樣式
│   └── anim.css          # 捲動動效
├── js/
│   └── anim.js           # 平滑捲動與進場動畫
├── images/
│   ├── djs/              # DJ 個人照
│   └── gallery/          # 演出照片與影片
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## 技術

- HTML5 / CSS3 / Vanilla JavaScript，無建置流程
- [Lenis](https://github.com/darkroomengineering/lenis) 平滑捲動（CDN）
- IntersectionObserver 進場動畫，支援 `prefers-reduced-motion`
- Font Awesome 圖示、Google Fonts（Oswald / Poppins / Noto Sans TC）
- JSON-LD 結構化資料、sitemap 與 robots.txt
- GitHub Pages 部署（推上 `main` 即自動更新）

### 設計

- 主色 `#ff2b4d`，背景 `#0a0a0d`
- 標題字體 Oswald，內文 Poppins + Noto Sans TC
- 響應式：桌機 / 平板 / 手機三段

## 開發方式

純靜態網站，直接開啟 `index.html` 即可預覽。若要測試相對路徑與 JSON-LD，建議起一個本機伺服器：

```bash
python3 -m http.server 8000
# 瀏覽 http://localhost:8000
```

## 維護筆記

### 相簿放回照片

首頁「活動花絮」目前留白，`css/main.css` 的磚牆版型與 `index.html` 的燈箱程式碼都保留著。要放回內容，在 `#gallery` 區塊內加入：

```html
<div class="gallery-grid">
    <figure class="gallery-item" data-type="image"
            data-src="images/gallery/檔名.jpg" data-caption="說明文字">
        <img src="images/gallery/檔名.jpg" alt="說明文字" loading="lazy">
        <span class="gallery-zoom"><i class="fas fa-expand"></i></span>
    </figure>
</div>
```

影片用 `data-type="video"`，加上 `class="g-wide"`（跨兩欄）或 `g-tall`（跨兩列）可做出磚牆變化。

### 圖片與影片

上傳前請先壓縮，圖片最長邊建議 1600px：

```bash
ffmpeg -i 原檔.jpg -vf "scale='min(1600,iw)':'min(1600,ih)':force_original_aspect_ratio=decrease" -q:v 4 輸出.jpg
ffmpeg -i 原檔.mp4 -vf "hqdn3d=2:1:3:3" -c:v libx264 -crf 30 -preset medium -movflags +faststart -c:a aac -b:a 80k 輸出.mp4
```

### 待補內容

- [ ] `images/djs/at.jpg`（AT 的照片）
- [ ] 社群連結：首頁 FB／IG／YouTube、各 DJ 的 IG／FB／SoundCloud（目前皆為 `#`）
- [ ] 首頁「近期演出」與「活動花絮」的實際內容
- [ ] `images/gallery/dinojin-performance-compressed.mp4` 仍有 32MB，建議剪短或改嵌 YouTube

## 聯絡資訊

- Email：sebulurco@gmail.com
- 服務範圍：全台皆可接洽，主要為台北、宜蘭、花蓮

---

Copyright © 2026 Sebulur. All rights reserved.
