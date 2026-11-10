import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/404.scss"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint notfound">
      <div class="nf-crack" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 12 L92 52 L108 74 L88 104 L104 132 L96 188"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="nf-crack-main"
          />
          <path
            d="M92 52 L64 44 M108 74 L140 62 M88 104 L58 116 M104 132 L136 146"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            class="nf-crack-branch"
          />
        </svg>
      </div>

      <p class="nf-code">ERROR 404</p>

      <h1>頁面燒製失敗</h1>

      <p class="nf-lead">
        這個頁面像一只趕窯時裂開的坯，出窯就不在了。
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
