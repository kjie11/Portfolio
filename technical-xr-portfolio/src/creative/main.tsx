import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ArrowRight, ArrowUpRight, Languages } from 'lucide-react'
import { Media } from '../shared/Media'
import { ProjectDetail } from '../shared/ProjectDetail'
import { projects } from '../shared/projects'
import { usePortfolio } from '../shared/usePortfolio'
import type { Language } from '../shared/types'
import './creative.css'

function CreativeApp() {
  const { language, setLanguage, project, open, close } = usePortfolio()
  if (project) return <><CreativeNav language={language} setLanguage={setLanguage} /><ProjectDetail project={project} language={language} onBack={close} variant="creative" /></>
  const t = language === 'zh' ? {
    title: '先让一个动作变得好玩。',
    intro: '我从身体动作和体验画面出发，把模糊的直觉快速做成可以试玩的规则，再通过观察、失败和删减找到更清楚的玩法。',
    drag: '拖动 / 滚动浏览', selected: '个独立原型', process: '我的工作方式', processCopy: '想象一个瞬间，做出最短的可玩版本。用真实体验去挑战方案，再留下真正有用的部分。',
    contact: '联系我', footer: '独立设计与开发 · 已脱敏项目'
  } : {
    title: 'Make one gesture feel worth playing.',
    intro: 'I begin with a physical gesture or an imagined moment, turn the intuition into a playable rule, then use observation, failure, and deliberate subtraction to find the clearer experience.',
    drag: 'Drag / scroll to browse', selected: 'independent prototypes', process: 'How I work', processCopy: 'Imagine one moment, build the shortest playable version, challenge it through real use, and keep only what makes the interaction clearer.',
    contact: 'Get in touch', footer: 'Solo design and development · Redacted work'
  }
  return <main className="creative-shell">
    <CreativeNav language={language} setLanguage={setLanguage} />
    <section className="creative-intro">
      <h1>{t.title}</h1><p className="creative-copy">{t.intro}</p>
      <div className="intro-foot"><span>05 {t.selected}</span><span>{t.drag} <ArrowRight /></span></div>
    </section>
    <PolaroidGallery language={language} onOpen={open} />
    <section className="creative-process">
      <p className="scribble">01—04</p><div><span>{t.process}</span><h2>{t.processCopy}</h2></div>
      <ol><li><b>01</b>{language === 'zh' ? '一个值得测试的身体瞬间' : 'A physical moment worth testing'}</li><li><b>02</b>{language === 'zh' ? '最短的可玩规则' : 'The shortest playable rule'}</li><li><b>03</b>{language === 'zh' ? '观察犹豫、失误与意外' : 'Observe hesitation, failure, and surprise'}</li><li><b>04</b>{language === 'zh' ? '删掉妨碍体验的复杂度' : 'Remove complexity that gets in the way'}</li></ol>
    </section>
    <footer className="creative-footer"><h2>YOUR NAME</h2><p>{t.footer}</p><a href="mailto:your.email@example.com">{t.contact}<ArrowUpRight /></a></footer>
  </main>
}

function CreativeNav({ language, setLanguage }: { language: Language; setLanguage: (value: Language) => void }) {
  return <nav className="creative-nav"><a href="/creative/">YOUR NAME</a><div><a href="/technical/">TECHNICAL ↗</a><button onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}><Languages />{language === 'zh' ? 'EN' : '中'}</button></div></nav>
}

function PolaroidGallery({ language, onOpen }: { language: Language; onOpen: (slug: string) => void }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const state = useRef({ target: 0, position: 0, velocity: 0, dragging: false, startX: 0, dragPosition: 0, moved: false, pressed: -1 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const stage = stageRef.current!, track = trackRef.current!
    let frame = 0
    const spacing = () => Math.min(470, Math.max(255, innerWidth * .34))
    const clamp = () => { state.current.target = Math.max(-(projects.length - 1) * spacing(), Math.min(0, state.current.target)) }
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const render = () => {
      const s = state.current, gap = spacing()
      s.position = reducedMotion ? s.target : s.position + (s.target - s.position) * .095
      if (!s.dragging && !reducedMotion) { s.target += s.velocity; s.velocity *= .91; clamp() }
      let closest = 0, closestDistance = Infinity
      Array.from(track.children).forEach((node, index) => {
        const card = node as HTMLElement, x = index * gap + s.position, distance = Math.abs(x)
        if (distance < closestDistance) { closestDistance = distance; closest = index }
        const normalized = Math.min(1, distance / (gap * 1.8))
        const sway = reducedMotion ? 0 : Math.max(-6, Math.min(6, s.velocity * .14))
        card.style.setProperty('--x', `${x}px`); card.style.setProperty('--z', `${-normalized * 140}px`); card.style.setProperty('--scale', `${1 - normalized * .14}`); card.style.setProperty('--sway', `${sway}deg`)
        card.classList.toggle('near', normalized < .35); card.classList.toggle('far', normalized > .8); card.style.zIndex = String(100 - Math.round(distance))
      })
      setCurrent(value => value === closest ? value : closest)
      frame = requestAnimationFrame(render)
    }
    const down = (event: PointerEvent) => { const s = state.current; s.dragging = true; s.moved = false; s.startX = event.clientX; s.dragPosition = s.target; s.velocity = 0; s.pressed = Number((event.target as HTMLElement).closest<HTMLElement>('.polaroid')?.dataset.index ?? -1); stage.classList.add('dragging'); stage.setPointerCapture(event.pointerId) }
    const move = (event: PointerEvent) => { const s = state.current; if (!s.dragging) return; const delta = event.clientX - s.startX; if (Math.abs(delta) > 6) s.moved = true; const next = s.dragPosition + delta; s.velocity = next - s.target; s.target = next; clamp() }
    const release = (event: PointerEvent) => { const s = state.current; if (!s.dragging) return; s.dragging = false; stage.classList.remove('dragging'); if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId); if (!s.moved && s.pressed >= 0) onOpen(projects[s.pressed].slug); s.pressed = -1 }
    const wheel = (event: WheelEvent) => { event.preventDefault(); state.current.velocity -= (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * .045 }
    stage.addEventListener('pointerdown', down); stage.addEventListener('pointermove', move); stage.addEventListener('pointerup', release); stage.addEventListener('pointercancel', release); stage.addEventListener('wheel', wheel, { passive: false }); addEventListener('resize', clamp); render()
    return () => { cancelAnimationFrame(frame); stage.removeEventListener('pointerdown', down); stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerup', release); stage.removeEventListener('pointercancel', release); stage.removeEventListener('wheel', wheel); removeEventListener('resize', clamp) }
  }, [onOpen])

  return <section className="gallery-stage" ref={stageRef} aria-label={language === 'zh' ? '项目画廊' : 'Project gallery'}>
    <div className="gallery-track" ref={trackRef}>{projects.map((project, index) => <button className="polaroid" data-index={index} key={project.slug} aria-label={`${language === 'zh' ? '查看项目' : 'View project'}: ${project.title[language]}`} style={{ '--rot': `${[-3.1, 1.8, -1.2, 2.7, -2][index]}deg`, '--cord': `${[128, 148, 116, 142, 124][index]}px` } as React.CSSProperties}>
      <span className="polaroid-hanger" aria-hidden="true"><i /></span><div className="polaroid-image"><Media project={project} language={language} compact /></div><div className="polaroid-caption"><strong>{project.shortTitle[language]}</strong><span>{project.engine} · {project.number}</span></div>
    </button>)}</div>
    <div className="gallery-title"><span>{projects[current].premise[language]}</span><b>{String(current + 1).padStart(2, '0')} / 05</b></div>
    <div className="gallery-progress"><i style={{ transform: `scaleX(${(20 + current * 20) / 100})` }} /></div>
  </section>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><CreativeApp /></React.StrictMode>)
