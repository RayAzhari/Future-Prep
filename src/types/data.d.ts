export interface Resource {
  id: number
  title: string
  platform: string
  category: string
  link: string
  description: string
}

export interface Scholarship {
  id: number
  title: string
  majors: string[]
  deadline: string
  amount: number
  description: string
  link: string
  eligibility: string
}

export interface ResearchOpportunity {
  id: number
  title: string
  institution: string
  description: string
  deadline: string
  link: string
  duration: string
  stipend: string | number
  location: string
}

export interface Extracurricular {
  id: number
  title: string
  category: string
  description: string
  timeCommitment: string
  benefits: string
  requirements: string
  website?: string
}
