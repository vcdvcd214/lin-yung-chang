import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/404.scss"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint notfound">
      <figure class="nf-photo">
        <img src={`${baseDir}static/404-kiln.webp`} alt="炸窯現場：窯內燒失敗的作品" loading="lazy" />
        <figcaption>炸窯現場・2025.12.15</figcaption>
      </figure>

      <p class="nf-code">ERROR 404</p>

      <h1>頁面燒製失敗</h1>

      <p class="nf-lead">
        這個頁面像窯裡那些撐不住的坯，出窯就不在了。
      </p>

      <p class="nf-note">
        可能是連結在修坯時被削去，也可能是它從來沒進過這座窯。
      </p>

      <div class="nf-actions">
        <a href={baseDir} class="nf-btn nf-btn-primary">回首頁重新拉胚</a>
        <a href={`${baseDir}notes/`} class="nf-btn">看看隨筆</a>
        <a href={`${baseDir}Gallery/`} class="nf-btn">看看作品</a>
      </div>

      <p class="nf-foot">
        找不到想看的？寫信告訴我：<a href="mailto:vcdvcd@gmail.com">vcdvcd@gmail.com</a>
      </p>
    </article>
  )
}

NotFound.css = style

export default (() => NotFound) satisfies QuartzComponentConstructor
