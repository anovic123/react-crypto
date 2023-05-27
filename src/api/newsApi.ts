import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GetTopNewsResponse } from "../common/types/get-top-news-data";

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://min-api.cryptocompare.com/data/v2/' }),
  endpoints: (builder) => ({
    getTopNewsData: builder.query<GetTopNewsResponse, void>({
      query: () => `/news/?lang=EN`
    })
  })
})

export const {
  useGetTopNewsDataQuery
} = newsApi;