import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects } from './projects'
import type { Language } from './types'

const readRoute = () => location.hash.match(/^#\/project\/([^/]+)/)?.[1] ?? null

export function usePortfolio() {
  const [language, setLanguage] = useState<Language>('zh')
  const [slug, setSlug] = useState<string | null>(readRoute)

  useEffect(() => {
    const onHash = () => { setSlug(readRoute()); window.scrollTo({ top: 0, behavior: 'instant' }) }
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  const project = useMemo(() => projects.find(item => item.slug === slug) ?? null, [slug])
  const open = useCallback((next: string) => { location.hash = `/project/${next}` }, [])
  const close = useCallback(() => {
    history.replaceState(null, '', `${location.pathname}${location.search}`)
    setSlug(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  return { language, setLanguage, project, open, close }
}
