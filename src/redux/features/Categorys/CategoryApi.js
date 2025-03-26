import {api} from '../../baseApi';

const CategoryApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query({
      query: ({page = 1, per_page = 10}) =>
        `/admin/categories?page=${page}&per_page=${per_page}`,
      providesTags: ['category'],
    }),



    getAllLeagalresources: builder.query({
      query: ({page = 1, per_page = 10}) =>
        `/admin/legal-resources/?page=${page}&per_page=${per_page}`,
      providesTags: ['resources'],
    }),

    
  }),
});

export const {useGetAllCategoriesQuery, useGetAllLeagalresourcesQuery} =
  CategoryApi;
export default CategoryApi;
