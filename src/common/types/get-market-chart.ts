export type GetMarketChartResponse = GetMarketChartData;

export interface GetMarketChartData {
  prices: number[][]
  market_caps: number[][]
  total_volumes: number[][]
}