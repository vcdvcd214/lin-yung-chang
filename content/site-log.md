---
title: ⚙️ 網站設置 LOG
description: Still Whispers 網站優化與待辦清單
---

# ⚙️ 網站設置 LOG

## 🪵 建立宗旨
紀錄「靜觀微語」數位圖書館的建置過程、技術參數與結構更動。

---
> [!abstract]- 📅 2026-11-14 | GSC 數據盤點、HTTPS 治理與署名政策定調
> - **📊 流量基線建立 (Search Console Baseline)**
>     - **首次完整匯出分析**：2026-01-27 → 2026-11-10 共 288 天，建立後續對照的基準線。
>     - **趨勢判讀**：近三個月的點擊與曝光約為前六個月的 2.5 倍，爬升曲線健康。
>     - **頁面結構洞察**：流量絕大多數來自「知識頁（Library）」與「資訊頁（open-call / exhibitions）」，作品頁與隨筆頁轉換極低。此後內容投資以知識頁為主力。
> - **🔐 HTTPS 轉址治理 (Protocol Hygiene)**
>     - **Always Use HTTPS 啟用**：Cloudflare SSL/TLS → Edge Certificates 開啟，所有 http 請求回 301 至 https。
>     - **驗證結果**：`http://vcdvcd.com/` 與 `http://vcdvcd.com/tags/台中` 均正確 301，**中文路徑原樣保留並編碼**（`%e5%8f%b0%e4%b8%ad`），非粗暴導回首頁。
>     - **標準網址收斂**：GSC 顯示 http 版本為「重複網頁；使用者未選取標準網頁」，Google 所選標準網址已是 `https://vcdvcd.com/`，無需另行處理。
>     - **Sitemap 健檢**：`sitemap.xml` 回 200、`application/xml`、全為 https 網址，`last-modified` 隨部署更新。
>     - **GitHub Pages Enforce HTTPS 灰階**：因 Cloudflare 橘雲代理使 GitHub 無法驗證憑證，屬預期現象，**不調整 DNS**，轉址由 Cloudflare 層負責。
> - **✍️ 署名與標題政策 (Naming Policy)**
>     - **問題**：查詢「林永章」有 20 次曝光、平均排名第 4，但**點擊為 0**。SERP 標題未與「陶藝」實體綁定，搜尋者無法辨識。
>     - **首頁 title** → `林永章｜陶藝筆記・柴燒與茶器`；**關於頁 title** → `關於我｜林永章 陶藝工作者`。
>     - **原則**：姓名置前作為事實欄位，不使用「名家」「大師」等吹捧詞；描述承載個性，metadata 保持正經。
>     - **副帶修正**：移除 title 開頭的 emoji（實測影響 SERP 點擊率）。
> - **🗺️ 地點揭露原則 (Location Disclosure)**
>     - **對外統一寫法**：`台中工作室、南投窯場`、`南投山邊的柴窯`、`往返於城市與山區之間`。
>     - **移除鄉鎮名**：龍井、中寮等鄉鎮搜尋量近零，卻帶定位風險，全站清除。
>     - **窯名泛稱化**：特定窯場名稱涉及第三方位置，改以「南投山邊的柴窯」表述；相關 tag、H1、圖說、日誌文字同步調整。
>     - **檔名保留**：`longan-kiln` 未改，避免斷索引；`/tags/龍安窯` 舊分頁將隨重建 404，不另行處理。
>     - **政策文件化**：整理為 SOP，供日後發文對照。
> - **🗓️ 徵件頁時效治理 (Temporal Accuracy)**
>     - **問題**：`notes/open-call/index.md` 仍標示「⏳ 徵件中」，但 2026 徵件季已於 6 月結束，過期資訊影響可信度。
>     - **修正**：標題「進度」→「紀錄」；六項賽事狀態改為「✅ 已截止」；新增說明區塊，定位為**規格工具書**，並註明 2027 簡章預計 2–3 月公告。
> - **📝 描述補齊 (Meta Description)**
>     - 依 GSC 曝光排序，優先補齊 11 篇：大墩美展（49）、陶藝防裂技法（48）、Library 索引（24）、Incubation（17）、釉藥學 GLAZE（94）、葫蘆墩聯展（147）等。
>     - **作品頁標題策略調整**：作品名本身無搜尋量，改為「作品名｜年代＋技法＋作者」格式，如 `Incubation 孵化｜2015 柴燒與異形卵實驗｜林永章`，使作品頁成為知識頁的轉換終點而非入口。
> - **🏷️ 標籤彙整頁修復 (/tags/pottery)**
>     - **症狀**：曝光 63、平均排名 5.4，點擊 0。
>     - **成因**：該頁由 Quartz 依巢狀標籤 `pottery/production` **自動生成**，content 內無對應檔案可直接編輯。
>     - **解法**：為高曝光頁面（陶藝釉藥學 131、陶藝防裂技法 48、葫蘆墩聯展 147）補上 `pottery` 標籤，使彙整頁有實質內容可抓，合計涵蓋 420 次曝光。維持 4–8 篇精選，不濫加。
>     - **待觀察**：該頁 title 目前為 Quartz 預設的 `標籤: pottery`，SERP 辨識度低；若兩週後仍無點擊，再評估調整標籤頁模板。
> - **⚠️ 踩坑紀錄 (Pitfall)**
>     - 修改 frontmatter 時誤刪結尾 `---`，導致 YAML 解析器將後續標題行視為多行 key，GitHub Actions 建置於 17 秒失敗。
>     - 錯誤訊息：`can not read a block mapping entry; a multiline key may not be an implicit key`。
>     - **對策**：凡更動 frontmatter，push 前先執行本地 `npx quartz build`（約 10 秒），確認 49 檔全數解析通過再推送。

> [!abstract]- 📅 2026-11-10 | 首頁重構、作品集索引、社群預覽修復與側欄優化
> - **🏛️ 首頁重構 (Index Refinement)**
>     - **賽事區塊轉為「回顧」**：標題改為 `2026 賽事回顧`，整張表收進 `[!abstract]-` 摺疊區塊，首頁視覺密度下降。
>     - **規格補齊**：補上原本缺漏的「重量上限 200kg」等對位資訊。
>     - **隨筆更新換血**：原本停在 2 月，改列 5–9 月共 5 篇（地獄懺、冰火開蓋、南投柴窯、Katsushi、落款印章）。
>     - **歷年紀錄**：補上 2024 年作品，修正 `Gallery/2015/` 多一層的錯誤路徑。
> - **🎨 作品集索引建置 (Gallery Index)**
>     - 新增 `content/Gallery/index.md`：以 `[!multi-column]` 排列作品縮圖＋年代／媒材／釉藥／尺寸。
>     - 附「展出脈絡」與「作品持續補齊中」說明，避免空站觀感。
>     - 首頁導覽下方新增「🎨 作品集 Gallery →」入口。
> - **🔗 連結與破圖修復 (Link & Asset Fix)**
>     - **壞連結 6 處**：`lin-yung-chang/content/...` 本機路徑誤植、`2026-progress`／`gallery/index` 不存在、`Gallery/2015/` 路徑錯誤、首頁 `about/interview-yibo` 不存在。
>     - **破圖 8 處**：`陶藝講座` 4 張多餘 `assets/` 前綴、`陶藝防裂技法` 的 `.png` 實為 `.webp` 與缺檔、`陶藝學` 目次 `P_6~P_9` 未匯入（改為「待補」）。
>     - **短連結統一**：5 處 `[[陶藝科學]]` 改為完整檔名＋顯示名。
>     - 驗證方式：建置後掃描全部 HTML 的 `href`／`img src`，壞連結 0、破圖 0。
> - **📸 社群預覽圖修復 (Open Graph)**
>     - **問題**：首頁／`about`／`exhibitions` 的 frontmatter `image:` 指向 `static/` 下**不存在的檔案**，導致 `og:image` 回 404。
>     - **連帶影響**：因為 `socialImage` 有值，Quartz 會**跳過**自動生成，等於三頁完全沒有預覽圖。
>     - **解法**：移除三頁的 `image:`，改由 `CustomOgImages` 自動產生 **1200×630**（每張 8–16 KB）。
> - **🧭 側欄導覽優化 (Explorer)**
>     - **排序修復**：原 `nameOrder` 使用「書籍紀錄」「隨筆紀錄」等**顯示名稱**，但程式取得的是資料夾名（`Library`、`notes`），導致排序全數失效。改用 `slugSegment` 並讓資料夾優先。
>     - **每資料夾筆數上限**：新增 `limitPerFolder`（預設 5）與 `noLimitFolders` 選項，超過上限顯示「⋯ 還有 N 篇」連結。
>     - **SEO 例外保護**：`Library` 與 `open-call` 不截斷，避免賽事頁少掉內鏈。
>     - **active 保護**：當前頁面若被截掉，仍保留該筆，避免側欄失去標示。
> - **🧹 統計腳本去重 (Analytics Cleanup)**
>     - `Footer.tsx` 原本重複載入 GoatCounter（`Head.tsx` 已載入），每頁請求兩次 → 移除 Footer 版本與隱藏計數 img。
>     - 保留 `quartz.config.ts` 的 Umami（動態注入）＋ `Head.tsx` 的 GoatCounter，各一次。
> - **⚠️ 踩坑紀錄 (Pitfall)**
>     - `Explorer` 的 `sortFn` 會被 `toString()` 序列化到瀏覽器端，再用 `new Function()` 重建。
>     - 因此**函式內不可引用外部常數** —— 初次改寫時把 `folderOrder` 定義在函式外，導致 `ReferenceError`、整個側欄空白。
>     - 正確做法：所有變數定義在函式內部（與原本 `nameOrder` 寫法一致）。

> [!abstract]- 📅 2026-11-10 | 流量後台無法登入：AdGuard 攔截 DNS 排查
> - **🚧 症狀 (Symptom)**
>     - `cloud.umami.is` 與 `vcdvcd.goatcounter.com` 皆顯示 **「This site can't be reached / refused to connect」**。
>     - 起初誤判為帳號被鎖或 Cloudflare 阻擋，實際為**本機 DNS 解析回傳 `0.0.0.0`**（黑洞位址）。
> - **🔍 排查過程 (Diagnosis)**
>     - 改系統 DNS 為 `1.1.1.1`／`1.0.0.1` 後，`dig @1.1.1.1` 仍回 `0.0.0.0`，但 **DoH（`cloudflare-dns.com/dns-query`）查詢正常**。
>     - 判斷為**明文 DNS（UDP/TCP 53）被本機程式接管改寫**，非 ISP 或 Cloudflare 問題。
>     - `systemextensionsctl list` 查獲 `com.adguard.mac.adguard.network-extension`（AdGuard for Mac 2.20.3）處於 `[activated enabled]`，確認 **AdGuard 網路擴充攔截追蹤網域**。
> - **✅ 解法 (Fix)**
>     - 於 AdGuard → 偏好設定 → 過濾器 → **使用者規則** 加入白名單（多行可一次貼上）：
>       ```
>       @@||cloud.umami.is^
>       @@||umami.is^
>       @@||goatcounter.com^
>       @@||vcdvcd.goatcounter.com^
>       ```
>     - 貼上後需**重啟保護**（暫停 → 再開啟）才會生效。
> - **📊 決策 (Decision)**
>     - 流量判讀改以 **Google Search Console** 為主（Google 自行收集，不受本機廣告攔截影響）。
>     - Umami／GoatCounter 降級為輔助參考：訪客若裝廣告攔截器，數據必然偏低，**不宜作為唯一判準**。

> [!abstract]- 📅 2026-02-22 | 賽事對位系統建置與首頁 SEO 深度重構
> - **🗓️ 賽事對位系統 (Open Call System)**
>     - **建立「規格工具書」**：於 `notes/open-call/` 目錄下建立 [[notes/open-call/yushan-fine-arts-award|玉山獎]]、[[notes/open-call/huangsi-art-exhibition|磺溪美展]]及[[notes/open-call/golden-teapot-award|金壺獎]]專屬頁面。
>     - **原子化管理**：將簡章中的工藝類規格（重量限制 80kg/100kg、尺寸、年份要求）提取為常態性參考資料，實現「去年份化」的長期對位邏輯。
> - **🏛️ 首頁結構進化 (Index Refinement)**
>     - **賽事地圖實裝**：於首頁導入 `Exhibition Circuit` 表格，直觀呈現年度參賽節奏與目前進度。
>     - **視覺去亂化**：徹底移除重複的 PDF 連結與過時的文字區塊，確立「地圖入口 → 工具書詳情」的導覽層次。
> - **🔍 SEO 品牌正名 (Branding & Discovery)**
>     - **官方譯名同步**：全面採用官方英文譯名如 *Nantou County Yushan Fine Arts Award* 與 *Huang-Si Art Exhibition*。
>     - **Meta Description 優化**：重構網頁描述，鎖定「賽事對位」、「設備維護」與「文獻整理」三大關鍵字，提升在工藝社群的搜尋權威。
> - **📸 影像敘事佈局**：將代表性投材紀錄照移至首頁底部，平衡「計畫性表格」與「現場職人感」。
> [!abstract]- 📅 2026-02-06 | 品牌識別整合：Favicon 實裝與搜尋引擎驗證
> - **🎨 視覺識別與 Favicon 革命 (Branding & Identity)**
>     - **負片「永」字實裝**：採用 [[2026-02-07-signature-stamp|2026 年新落款字體]]，經負片模式處理後上傳至 `static/icon.png`。
>     - **自動化適配**：利用 Quartz Favicon 外掛，自動從單一 PNG 產生 `favicon.ico` 及行動端所需的各式圖標，確保全平台視覺統一。
> - **🔍 搜尋引擎治理 (SEO & Webmaster)**
>     - **Bing Webmaster 驗證**：透過 Cloudflare DNS 成功新增 CNAME 記錄，完成 Microsoft 搜尋引擎權限驗證。
>     - **Yandex 驗證**：於 Cloudflare 部署 TXT 驗證記錄，擴展海外搜尋引擎（Yandex）的收錄範圍。
> - **🔧 基礎設施 (DNS Management)**
>     - **Cloudflare 聯動**：所有驗證記錄均透過 Cloudflare 全球節點即時生效，維持 DNS 層級的純粹性。
> ^favicon2026

> [!abstract]- 📅 2026-01-30 | 效能全彈發射：Cloudflare 深度優化與連線提速
> - **🚀 傳輸效能革命 (Performance Tuning)**
>     - **載入順序重構**：啟用 **Rocket Loader™**。將 JavaScript 異步化處理，優先釋放主線程以解決 PageSpeed 報告中 5.1s LCP 的延遲問題。
>     - **資源優先級預判**：聯動開啟 **Smart Hints** 與 **Early Hints**。由伺服器主動預告瀏覽器下載 `index.css` 與關鍵字體，大幅縮短白屏等待時間。
>     - **字體在地化**：啟用 **Cloudflare Fonts**。將 Google Fonts 資源轉向至 `vcdvcd.com` 自有網域，消除第三方 DNS 查詢延遲並修正佈局位移 (CLS)。
> - **⚡️ 體感速度優化 (UX Acceleration)**
>     - **瞬移跳轉實作**：啟用 **Speed Brain**。利用瀏覽器 Speculative Rules 預判技術，在點擊前提前預載內容，強化筆記間跳轉的流暢感。
>     - **零延遲連線**：開啟 **0-RTT Connection Resumption**。優化 TLS 握手程序，讓回訪者（常駐讀者）獲得近乎瞬時的加密連線體驗。
> - **📦 資源輕量化實作 (Payload Reduction)**
>     - **三要素自動縮小**：開啟 **Auto Minify (HTML/CSS/JS)**，從底層移除冗餘代碼空間。
>     - **現代壓縮協議**：確認 **Brotli** 配置，確保數據以最高壓縮比率進行傳輸。
> - **🛡️ 安全防禦佈署 (Security Hardening)**
>     - **自動化威脅阻擋**：啟用 **Bot Fight Mode**。過濾惡意爬蟲，保護原創實驗數據不被無差別抓取。
> - **🧠 決策與權衡 (Logic & Decision)**
>     - **拒絕過度監控**：評估後關閉 **Real User Monitoring (RUM)**。秉持「減法優化」，避免不必要的第三方腳本再次拖慢效能。
>     - **防禦邊界確立**：判定 Page Shield 與 Leaked Credentials 不符靜態架構需求，決定「不開啟」以維持系統純粹性。

> [!abstract]- 📅 2026-01-28 | 網域正名、設備維護系統建置與首頁重構
> - **🌐 網域遷移 (Domain 正名化)：邁向獨立 ID**
>     - **縮短路徑**：正式從 GitHub 預設長網址 `https://vcdvcd214.github.io/lin-yung-chang` 遷移至獨立網域 **`vcdvcd.com`**。這不僅是技術上的轉向，更是視覺上的減法，消除了第三方平台的冗長路徑。
>     - **品牌辨識**：強化「vcdvcd」個人 ID 的唯一性。透過網域正名，確立了數位圖書館的永久居所，讓讀者能以最直覺的方式訪問。
>     - **技術佈署**：完成 Cloudflare DNS 轉向與 SSL 安全憑證設置，確保全站加密傳輸。
> - **🏺 設備維護系統建置 (Equipment System)**
>     - **旗艦規格建立**：完成 `Vacuum-Pug-Mill-2HP` 硬核保養筆記。整合中油技術部門建議（R100/R68）、原廠單據 WebP 數位化，並嵌入 YouTube 教學影片。
>     - **職業安全考據**：針對文獻中「硅肺」與「矽肺」用字進行溯源，將設備保養提升至職人健康管理層次。
>     - **預告機制**：建立 `notes/Equipment/index`，佈署電窯、拉坯機與 DIY 工具的撰寫 Roadmap。
> - **📚 圖書館建設與編輯流**
>     - **圖書入庫**：新增《陶藝釉藥學》專業筆記，導入摺疊式實體影像紀錄。
>     - **工具優化**：導入 `Codeblock Customizer` 插件，提升代碼管理體驗。
> - **🏛️ 首頁結構升級 (Index Refinement)**
>     - **三欄位導覽**：重構 `index.md`，確立「文獻典藏、設備維護、隨筆紀錄」三大核心入口。

> [!abstract]- 📅 2026-01-15 | 側邊欄秩序、路徑修復與在地化
> - **🧩 側邊欄視覺革命 (UI Refinement)**
>     - **自動標題前綴**：於 `quartz.layout.ts` 注入 `mapFn` 邏輯，自動為檔案標題補上「・」，消除散亂感。
>     - **Emoji 全站統一**：修正「👤 關於我」與「⚙️ 網站設置 LOG」的圖示，讓導覽列呈現系統化視覺。
> - **🔗 路徑與 404 修復 (Link Fix)**
>     - **Footer 重構**：修正底部「建構日誌」連結路徑，從子資料夾導回根目錄，確保跳轉正確。
> - **💻 本機開發環境搭建 (Local Development)**
>     - **VS Code 導入**：正式捨棄純網頁編輯，改採 VS Code 編輯 `quartz.layout.ts`。
>     - **環境偵錯**：安裝 Node.js LTS 與 Prettier 插件，確保代碼格式嚴謹。
>     - **目前瓶頸**：本地 Server (`npx quartz build --serve`) 依賴安裝中，準備實現即時預覽。

> [!abstract]- 📅 2026-01-14 | 系統重構、數據追蹤與核心入庫
> - **📊 流量統計佈署**：完成 GoatCounter 雙重植入（Head & Footer）。
> - **🏺 視覺識別**：確立側邊欄標題為 `🏺 全站導覽`。
> - **📚 核心藏書入庫**：建立《陶藝講座-邱煥堂》、《柴燒-陳威恩》與《陶藝科學》三本基礎架構。
> - **💬 評論系統**：掛載 Giscus，串接 GitHub Discussions。

> [!abstract]- 📅 2026-01-13 | 風格確立與版面調校
> - **🎨 風格設定**：預設深色模式 (Dark Mode)，符合職人沉靜調性。
> - **🛠️ 組件配置**：加入 Search、Darkmode 與讀者互動組件。

> [!abstract]- 📅 2026-01-12 | 破土動工：環境部署
> - **🚀 技術選型**：採用 Quartz 4.0 引擎。
> - **📦 儲存同步**：使用 GitHub 與 GitHub Desktop 進行版本管理。
> - **📈 SEO 基礎**：配置 Google Search Console。

---

### 🛠️ 技術堆疊 (Technical Stack)

| 類別 | 項目 | 備註 |
| :--- | :--- | :--- |
| **Engine** | [Quartz 4.0](https://quartz.jzhao.xyz/) | SPA 模式 |
| **Editor** | **Obsidian / VS Code** | 支援雙向連結與 Prettier 格式化 |
| **Storage** | **GitHub** | 搭配 GitHub Desktop 管理 |
| **Deploy** | **GitHub Actions → GitHub Pages** | `v4` 分支推送即自動建置部署 |
| **Comments** | **Giscus** | GitHub Discussions 後端 |
| **Analytics** | **Umami Cloud** | 動態注入（`postscript.js`） |
| **Analytics（舊）** | **GoatCounter** | `Head.tsx` 靜態載入，與 Umami 並行 |
| **SEO 觀測** | **Google Search Console** | 主要流量判讀依據，不受本機攔截影響 |
| **社群預覽** | **CustomOgImages** | 自動產生 1200×630 網頁縮圖 |

---

### 💡 更新守則
每次進行技術更動或大規模內容更新時，請於最上方新增一個 `[!abstract]-` 區塊，確保「靜觀微語」的成長軌跡清晰可尋。