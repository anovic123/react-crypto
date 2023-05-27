export type GetTopNewsResponse = TopNewsData

export interface TopNewsData {
  Type: number
  Message: string
  Promoted: any[]
  Data: DataType[]
  RateLimit: RateLimit
  HasWarning: boolean
}

export interface DataType {
  id: string
  guid: string
  published_on: number
  imageurl: string
  title: string
  url: string
  body: string
  tags: string
  lang: string
  upvotes: string
  downvotes: string
  categories: string
  source_info: SourceInfo
  source: string
}

export interface SourceInfo {
  name: string
  img: string
  lang: string
}

export interface RateLimit {}
