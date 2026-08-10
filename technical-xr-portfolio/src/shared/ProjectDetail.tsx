import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { Media } from './Media'
import { projects } from './projects'
import type { Language, Project } from './types'

export function ProjectDetail({ project, language, onBack, variant }: { project: Project; language: Language; onBack: () => void; variant: 'technical' | 'creative' }) {
  const angle = variant === 'technical' ? project.technicalAngle : project.creativeAngle
  const labels = language === 'zh' ? {
    back: '返回项目', overview: '项目简介', contribution: '我做了什么', capabilities: '能力点', workflow: 'AI 协作流程', workflowNote: 'AI 加速读取、实现和检查；体验目标、范围取舍与最终判断由我完成。', status: '当前状态', contact: '讨论这个项目'
  } : {
    back: 'Back to projects', overview: 'Overview', contribution: 'What I did', capabilities: 'Capabilities', workflow: 'AI-assisted workflow', workflowNote: 'AI accelerates inspection, implementation, and checks. I retain the experience goal, scope decisions, and final judgment.', status: 'Current status', contact: 'Discuss this project'
  }
  return <main className={`detail detail-${variant}`}>
    <header className="detail-nav">
      <button className="back-button" onClick={onBack}><ArrowLeft aria-hidden="true" />{labels.back}</button>
      <span>{project.number} / {String(projects.length).padStart(2, '0')}</span>
    </header>
    <section className="detail-hero">
      <div className="detail-title">
        <h1>{project.title[language]}</h1>
        <p className="detail-premise">{project.premise[language]}</p>
        <p className="detail-meta">{project.engine} · {project.year}</p>
      </div>
      <div className="detail-media"><Media project={project} language={language} /></div>
    </section>
    <section className="detail-grid">
      <div className="detail-overview"><p className="section-label">{labels.overview}</p><p>{angle[language]}</p><p className="role-line">{project.role[language]}</p></div>
      <div className="detail-list"><p className="section-label">{labels.contribution}</p><ul>{project.contribution.map((item, index) => <li key={index}><Check aria-hidden="true" />{item[language]}</li>)}</ul></div>
    </section>
    <section className="capability-band">
      <p className="section-label">{labels.capabilities}</p>
      <div className="capability-list">{project.capabilities.map((item, index) => <span key={index}>{String(index + 1).padStart(2, '0')}<strong>{item[language]}</strong></span>)}</div>
    </section>
    {project.workflow ? <section className="workflow-section">
      <div className="workflow-heading"><p className="section-label">{labels.workflow}</p><p>{labels.workflowNote}</p></div>
      <ol className="workflow-flow">{project.workflow[language].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
    </section> : null}
    {project.extraMedia?.length ? <section className="extra-media">{project.extraMedia.map(item => <img key={item.src} src={item.src} alt={item.alt[language]} />)}</section> : null}
    {project.status ? <section className="status-section"><p className="section-label">{labels.status}</p><p>{project.status[language]}</p></section> : null}
    <footer className="detail-footer"><a href="mailto:your.email@example.com">{labels.contact}<ArrowUpRight aria-hidden="true" /></a><span>YOUR NAME · 2026</span></footer>
  </main>
}
