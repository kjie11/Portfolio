import { Play } from 'lucide-react'
import type { Language, Project } from './types'

export function Media({
  project,
  language,
  compact = false,
  hero = false,
}: {
  project: Project
  language: Language
  compact?: boolean
  hero?: boolean
}) {
  const media = project.media
  if (media.kind === 'video' && media.src) return <video className="project-media" src={media.src} poster={project.extraMedia?.[0]?.src} muted loop autoPlay={hero} playsInline controls={!compact && !hero} preload={compact ? 'metadata' : 'auto'} aria-label={media.alt[language]} />
  if (media.kind === 'image' && media.src) return <img className="project-media" src={media.src} alt={media.alt[language]} loading="eager" decoding="async" />
  return <div className="project-media media-placeholder" role="img" aria-label={media.alt[language]}><Play aria-hidden="true" /><span>{language === 'zh' ? '项目视频待添加' : 'Project video coming soon'}</span><small>YouTube</small></div>
}
