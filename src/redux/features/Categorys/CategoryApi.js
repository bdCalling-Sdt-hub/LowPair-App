import { api } from '../../baseApi';

const CategoryApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query({
      query: ({ page = 1, per_page = 10 }) =>
        `/admin/categories?page=${page}&per_page=${per_page}`,
      providesTags: ['Category'],
    }),

    getAllLeagalresources: builder.query({
      query: ({ page = 1, per_page = 10 }) =>
        `/admin/legal-resources/?page=${page}&per_page=${per_page}`,
      providesTags: ['Resources'],
    }),

    findLawyer: builder.query({
      query: ({ service_ids, state, language }) => ({
        url: `/find-lawyers`,
        method: 'GET',
        params: {
          service_ids: JSON.stringify(service_ids), // Ensure array is properly formatted
          state,
          language,
        },
      }),
    }),

    MarkAsFevorite : builder.mutation({
      query: (id) => ({
        url: `/user/mark-as-favorite`,
        method: 'POST',
        body: { lawyer_id: id },
      }),
    }),

    GetLawyerById : builder.query({
      query: (id) => ({
        url: `/lawyer/${id}`,
        method: 'GET',
      }),
    }),


    GetFevoriteList : builder.query({
      query: ({ page = 1, per_page = 10 }) => ({
        url: `/user/favorite-list?per_page=${per_page}&page=${page}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllLeagalresourcesQuery,
  useFindLawyerQuery,
  useMarkAsFevoriteMutation,
  useGetLawyerByIdQuery,
  useGetFevoriteListQuery
} = CategoryApi;

export default CategoryApi;