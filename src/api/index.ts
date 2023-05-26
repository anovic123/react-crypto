import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetTopDataResponse } from "../common/types/get-top-data";

import { config } from "../core/config";

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
  endpoints: (builder) => ({
    getTopPriceData: builder.query<GetTopDataResponse, void>({
      query: () => `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    })
  })
})

export const {
  useGetTopPriceDataQuery
} = coinsApi;