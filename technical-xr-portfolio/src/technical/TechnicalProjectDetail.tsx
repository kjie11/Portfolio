import { ArrowLeft, ExternalLink, Play } from 'lucide-react'
import { Media } from '../shared/Media'
import type { Language, Project } from '../shared/types'
import './project-detail.css'

function getYoutubeId(value?: string) {
  if (!value) return null

  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    let id: string | null = null

    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] ?? null
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') id = url.searchParams.get('v')
      else if (/^\/(embed|shorts|live)\//.test(url.pathname)) id = url.pathname.split('/')[2] ?? null
    }

    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

export function TechnicalProjectDetail({ project, language, onBack }: { project: Project; language: Language; onBack: () => void }) {
  const youtubeUrl = project.youtubeUrl
  const youtubeId = getYoutubeId(youtubeUrl)
  const copy = language === 'zh' ? {
    back: '返回项目',
    overview: '项目概览',
    keyWork: '关键工作',
    workflow: '工作流程',
    status: '当前状态',
    roles: '角色',
    technologies: '技术',
    scale: '项目规模',
    scaleValue: '独立原型',
    year: '年份',
    process: '协作方式',
    supporting: '补充画面',
    video: '项目视频',
    videoPending: '项目视频待添加',
    videoNote: 'YouTube 链接准备好后将在这里播放。',
    openYoutube: '在 YouTube 中打开',
    iframeTitle: `${project.title.zh} 项目视频`,
  } : {
    back: 'Back to projects',
    overview: 'Project Overview',
    keyWork: 'Key Work',
    workflow: 'Workflow',
    status: 'Current Status',
    roles: 'Roles',
    technologies: 'Technologies',
    scale: 'Project Scale',
    scaleValue: 'Independent prototype',
    year: 'Year',
    process: 'Collaboration',
    supporting: 'Supporting Images',
    video: 'Project Video',
    videoPending: 'Project video coming soon',
    videoNote: 'The YouTube video will play here when the link is ready.',
    openYoutube: 'Open on YouTube',
    iframeTitle: `${project.title.en} project video`,
  }

  const technologies = [project.engine, ...project.capabilities.map(item => item[language])]

  return <article className="technical-project-detail">
    <div className="technical-detail-shell">
      <section className="technical-detail-lead" aria-label={project.media.alt[language]}>
        <Media project={project} language={language} compact hero />
      </section>

      <button className="technical-detail-back" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" />
        <span>{copy.back}</span>
      </button>

      <header className="technical-detail-header">
        <h1>{project.title[language]}</h1>
        <p>{project.premise[language]}</p>
      </header>

      <div className="technical-detail-grid">
        <div className="technical-detail-narrative">
          <section>
            <h2>{copy.overview}</h2>
            <p className="technical-detail-overview">{project.technicalAngle[language]}</p>
          </section>

          <section>
            <h2>{copy.keyWork}</h2>
            <ul className="technical-detail-work">
              {project.contribution.map((item, index) => <li key={`${item.en}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><p>{item[language]}</p></li>)}
            </ul>
          </section>

          {project.workflow ? <section>
            <h2>{copy.workflow}</h2>
            <ol className="technical-detail-workflow">
              {project.workflow[language].map((step, index) => <li key={`${step}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}
            </ol>
          </section> : null}

          {project.status ? <section className="technical-detail-status">
            <h2>{copy.status}</h2>
            <p>{project.status[language]}</p>
          </section> : null}
        </div>

        <aside className="technical-detail-meta" aria-label={language === 'zh' ? '项目元数据' : 'Project metadata'}>
          <dl>
            <div><dt>{copy.roles}</dt><dd>{project.role[language]}</dd></div>
            <div><dt>{copy.technologies}</dt><dd className="technical-detail-tags">{technologies.map((technology, index) => <span key={`${technology}-${index}`}>{technology}</span>)}</dd></div>
            <div><dt>{copy.scale}</dt><dd>{project.scale?.[language] ?? copy.scaleValue}</dd></div>
            <div><dt>{copy.year}</dt><dd>{project.year}</dd></div>
            {project.collaboration ? <div><dt>{copy.process}</dt><dd>{project.collaboration[language]}</dd></div> : null}
          </dl>
        </aside>
      </div>

      {project.extraMedia?.length ? <section className="technical-detail-supporting" aria-labelledby="supporting-media-title">
        <h2 id="supporting-media-title">{copy.supporting}</h2>
        <div>{project.extraMedia.map(item => <img key={item.src} src={item.src} alt={item.alt[language]} loading="eager" decoding="async" />)}</div>
      </section> : null}

      <section className="technical-detail-youtube" aria-labelledby="project-video-title">
        <div className="technical-detail-section-heading">
          <h2 id="project-video-title">{copy.video}</h2>
          {youtubeId && youtubeUrl ? <a href={youtubeUrl} target="_blank" rel="noreferrer">{copy.openYoutube}<ExternalLink aria-hidden="true" /></a> : null}
        </div>
        <div className="technical-detail-video-frame">
          {youtubeId ? <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={copy.iframeTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          /> : <div className="technical-detail-video-placeholder" role="img" aria-label={copy.videoPending}>
            <span className="technical-detail-play"><Play aria-hidden="true" /></span>
            <strong>{copy.videoPending}</strong>
            <p>{copy.videoNote}</p>
          </div>}
        </div>
      </section>
    </div>
  </article>
}
