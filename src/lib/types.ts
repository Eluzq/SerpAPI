export interface TextBlock {
  type: string
  snippet?: string
  reference_indexes?: number[]
  list?: ListItem[]
  text_blocks?: TextBlock[]
}

export interface ListItem {
  title?: string
  snippet?: string
  reference_indexes?: number[]
  list?: ListItem[]
}

export interface Reference {
  title: string
  link: string
  snippet?: string
  source: string
  index: number
}

export interface AIOverview {
  text_blocks?: TextBlock[]
  references?: Reference[]
  error?: string
}

export interface AIOverviewData {
  search_metadata: {
    id: string
    status: string
    created_at: string
    processed_at: string
    total_time_taken: number
  }
  search_parameters: {
    engine: string
    page_token?: string
  }
  ai_overview?: AIOverview
  no_ai_overview?: boolean
  search_results?: {
    organic_results?: OrganicResult[]
    knowledge_graph?: KnowledgeGraph
    answer_box?: AnswerBox
  }
}

export interface OrganicResult {
  position: number
  title: string
  link: string
  displayed_link?: string
  snippet: string
  source?: string
}

export interface KnowledgeGraph {
  title: string
  description: string
  source?: any
  thumbnail?: string
}

export interface AnswerBox {
  title?: string
  answer?: string
  snippet?: string
  source?: any
}

export interface SearchResultsData {
  search_metadata: {
    id: string
    status: string
    created_at: string
    processed_at: string
    total_time_taken: number
  }
  search_parameters: {
    engine: string
    q: string
  }
  no_ai_overview: boolean
  search_results: {
    organic_results?: OrganicResult[]
    knowledge_graph?: KnowledgeGraph
    answer_box?: AnswerBox
  }
}

