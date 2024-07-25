interface albumTopReq {
  area?: 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP'
  type?: 'new' | 'hot'
  year?: number
  month?: number
}

export type { albumTopReq }
