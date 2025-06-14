import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.testlawpair.com/api',
  // headers: {
  //   'Content-Type': 'application/json', // Ensure proper content type
  // },
  prepareHeaders: async headers => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
      headers.set('Accept', '*/*');
      headers.set('Access-Control-Allow-Origin', '*/*');
    }
    return headers;
  },
});

// Create a wrapper around baseQuery that adds your post-processing
const baseQueryWithPostProcessing = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  console.log('Base Api Results ===================', result?.data);
  // Check if response data is a string and malformed
  if (typeof result?.data === 'string') {
    // if (!result.data.endsWith('}')) {
    const withCurly = (result.data += '}');
    return {data: JSON.parse(withCurly)};
    // }
  }
  if (typeof result?.data === 'object') {
    return {data: result?.data};
  }
  if (result?.error) {
    // console.log("Base Api Error ===================", result.error);
    if (result?.error?.data) {
      if (typeof result?.error?.data === 'string') {
        const withCurly = (result.error.data += '}');
        // console.log(withCurly);
        return {data: JSON.parse(withCurly)};
      }
    }
    return {error: result.error};
  }
  return {data: result?.data || []};
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithPostProcessing,
  tagTypes: [
    'user',
    'blog',
    'faq',
    'about',
    'notification',
    'Category',
    'Resources',
    'Lawyer',
  ],
  endpoints: () => ({}),
});

export const imageUrl = 'http://182.252.68.227:8100/api';

export default api;
