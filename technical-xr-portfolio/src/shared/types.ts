export type Language = 'zh' | 'en'
export type Copy = { zh: string; en: string }

export type Project = {
  slug: string
  number: string
  title: Copy
  shortTitle: Copy
  year: string
  engine: string
  role: Copy
  premise: Copy
  technicalAngle: Copy
  creativeAngle: Copy
  contribution: Copy[]
  capabilities: Copy[]
  workflow?: { zh: string[]; en: string[] }
  status?: Copy
  scale?: Copy
  collaboration?: Copy
  media: { kind: 'image' | 'video' | 'placeholder'; src?: string; alt: Copy }
  extraMedia?: { src: string; alt: Copy }[]
  youtubeUrl?: string
  tags: Copy[]
}
