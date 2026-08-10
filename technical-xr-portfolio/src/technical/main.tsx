import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { ArrowUpRight, Languages } from 'lucide-react'
import { Media } from '../shared/Media'
import { projects } from '../shared/projects'
import type { Language, Project } from '../shared/types'
import { usePortfolio } from '../shared/usePortfolio'
import { TechnicalProjectDetail } from './TechnicalProjectDetail'
import './technical.css'

const technicalProjectOrder = [
  'abyss-vr',
  'ar-graffiti',
  'speaking-world',
  'emotional-mask',
  'ar-escape-room',
  'four-way-kitchen',
  'claw-machine',
  'white-lavender',
  'cat-teaser',
  'mole-rhythm',
  'gothic-hunter',
]

const technicalProjects = technicalProjectOrder.map((slug) => projects.find((project) => project.slug === slug)!)

function TechnicalApp() {
  const { language, setLanguage, project, open, close } = usePortfolio()
  const copy = language === 'zh'
    ? {
        title: 'Hi, I’m Ruyan —',
        role: 'Creative Explorer',
        work: '项目',
        creative: '创意版',
        view: '查看项目',
        end: '暂时就这些。',
        disclosure: 'AI 工具参与受控实现、测试与文档；产品判断、交互决策与最终验收由我负责。',
      }
    : {
        title: 'Hi, I’m Ruyan —',
        role: 'Creative Explorer',
        work: 'Work',
        creative: 'Creative',
        view: 'View project',
        end: "That's all for now.",
        disclosure: 'AI tools assist scoped implementation, testing, and documentation; product judgment, interaction decisions, and final acceptance remain mine.',
      }

  if (project) {
    return (
      <main className="technical-shell technical-detail-route">
        <TechnicalNav language={language} setLanguage={setLanguage} copy={copy} onWork={() => {
          close()
          requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('work')?.scrollIntoView()))
        }} />
        <TechnicalProjectDetail project={project} language={language} onBack={close} />
      </main>
    )
  }

  return (
    <main className="technical-shell">
      <TechnicalNav language={language} setLanguage={setLanguage} copy={copy} />

      <div className="technical-surface">
        <header className="technical-intro">
          <h1>{copy.title}</h1>
          <p className="technical-role">{copy.role}</p>
        </header>

        <section className="technical-projects" id="work" aria-label={copy.work}>
          {technicalProjects.map((item) => (
            <ProjectCard
              key={item.slug}
              project={item}
              language={language}
              viewLabel={copy.view}
              onOpen={open}
            />
          ))}
        </section>
        <footer className="technical-end">
          <span>{copy.end}</span>
          <small>{copy.disclosure}</small>
        </footer>
      </div>
    </main>
  )
}

function TechnicalNav({
  language,
  setLanguage,
  copy,
  onWork,
}: {
  language: Language
  setLanguage: (value: Language) => void
  copy: { work: string; creative: string }
  onWork?: () => void
}) {
  return (
    <nav className="technical-nav" aria-label={language === 'zh' ? '主导航' : 'Primary navigation'}>
      <div className="technical-nav-inner">
        <a className="technical-wordmark" href="/technical/">{language === 'zh' ? '秦儒妍' : 'Ruyan Qin'}</a>
        <div className="technical-nav-links">
          {onWork ? <button type="button" onClick={onWork}>{copy.work}</button> : <a href="#work">{copy.work}</a>}
          <a href="/creative/">{copy.creative}</a>
        </div>
        <button
          className="language-button"
          type="button"
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          aria-label={language === 'zh' ? 'Switch to English' : '切换为中文'}
        >
          <Languages aria-hidden="true" />
          <span>{language === 'zh' ? 'EN' : '中'}</span>
        </button>
      </div>
    </nav>
  )
}

function ProjectCard({
  project,
  language,
  viewLabel,
  onOpen,
}: {
  project: Project
  language: Language
  viewLabel: string
  onOpen: (slug: string) => void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.querySelector('video')?.pause()
  }, [])

  const playPreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    void buttonRef.current?.querySelector('video')?.play().catch(() => undefined)
  }

  const pausePreview = () => {
    buttonRef.current?.querySelector('video')?.pause()
  }

  return (
    <button
      ref={buttonRef}
      className={`technical-card technical-card-${project.media.kind} technical-card-${project.slug}`}
      type="button"
      onClick={() => onOpen(project.slug)}
      onMouseEnter={playPreview}
      onMouseLeave={pausePreview}
      onFocus={playPreview}
      onBlur={pausePreview}
      aria-label={`${viewLabel}: ${project.title[language]}`}
    >
      <span className="technical-card-media">
        <Media project={project} language={language} compact />
      </span>
      <span className="technical-card-shade" aria-hidden="true" />
      <span className="technical-card-copy">
        <span className="technical-card-meta">
          {project.engine} / {project.year}
        </span>
        <strong>{project.shortTitle[language]}</strong>
        <span className="technical-card-role">{project.role[language]}</span>
        <span className="technical-card-action">
          {viewLabel}<ArrowUpRight aria-hidden="true" />
        </span>
      </span>
    </button>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TechnicalApp />
  </React.StrictMode>,
)
