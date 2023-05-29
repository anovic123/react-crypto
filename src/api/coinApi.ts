import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetDetailsDataResponse } from "../common/types/get-details-data";
import { GetMarketChartResponse } from "../common/types/get-market-chart";
import { GetTopDataResponse } from "../common/types/get-top-data";

import { config } from "../core/config";

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
  endpoints: (builder) => ({
    getTopPriceData: builder.query<GetTopDataResponse, void>({
      query: () => `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    }),
    getDetailsData: builder.query<GetDetailsDataResponse, string>({
      query: (id) => `/coins/${id}`
    }),
    getMarketChart: builder.query<GetMarketChartResponse, { id: string; days: number }>({
      query: ({id, days}) => `/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    }),
  })
})

export const {
  useGetTopPriceDataQuery,
  useGetDetailsDataQuery,
  useGetMarketChartQuery,
} = coinsApi;