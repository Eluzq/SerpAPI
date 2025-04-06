export interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_ai_overview_url: string;
  raw_html_file: string;
  total_time_taken: number;
}

export interface SearchParameters {
  engine: string;
  page_token: string;
}

export interface TextBlock {
  type: string;
  snippet: string;
  snippet_highlighted_words?: string[];
  reference_indexes: number[];
}

export interface ListItem {
  title?: string;
  snippet: string;
  reference_indexes: number[];
}

export interface ListBlock extends TextBlock {
  list: ListItem[];
}

export interface Reference {
  title: string;
  link: string;
  snippet?: string;
  source: string;
  index: number;
}

export interface AIOverview {
  text_blocks: (TextBlock | ListBlock)[];
  thumbnail?: string;
  references: Reference[];
}

export interface SerpApiResponse {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  ai_overview: AIOverview;
} 