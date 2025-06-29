import {api} from '../../baseApi';

const CategoryApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query({
      query: ({page = 1, per_page = 10}) =>
        `/admin/categories?page=${page}&per_page=${per_page}`,
      providesTags: ['Category'],
    }),

    getAllLeagalresources: builder.query({
      query: ({page = 1, per_page = 10}) =>
        `/admin/legal-resources/?page=${page}&per_page=${per_page}`,
      providesTags: ['Resources'],
    }),

    findLawyer: builder.query({
      query: ({service_ids, state, language}) => ({
        url: `/find-lawyers`,
        method: 'GET',
        params: {
          service_ids: JSON.stringify(service_ids), // Ensure array is properly formatted
          state,
          language,
        },
      }),
      providesTags: ['Lawyer', 'Fevorite'],
    }),

    MarkAsFevorite: builder.mutation({
      query: id => ({
        url: `/user/mark-as-favorite`,
        method: 'POST',
        body: {lawyer_id: id},
      }),
      invalidatesTags: ['Fevorite'],
    }),

    markasUnfevorite: builder.mutation({
      query: id => ({
        url: `/user/unmark-as-favorite/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fevorite'],
    }),

    GetLawyerById: builder.query({
      query: id => ({
        url: `/lawyer/${id}`,
        method: 'GET',
      }),
    }),

    GetFevoriteList: builder.query({
      query: ({page = 1, per_page = 10}) => ({
        url: `/user/favorite-list?per_page=${per_page}&page=${page}`,
        method: 'GET',
      }),
    }),

    GetAllCategory: builder.query({
      query: () => ({
        url: `/admin/categories?per_page=9999999`,
        method: 'GET',
      }),
    }),

    createYourOwnProfile: builder.mutation({
      query: data => ({
        url: `/lawyer/update-profile`,
        method: 'POST',
        body: data,
      }),
    }),

    aboutUs: builder.query({
      query: () => ({
        url: `/admin/about`,
        method: 'GET',
      }),
    }),

    disclaimars: builder.query({
      query: () => ({
        url: `/admin/disclaimer`,
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
  useGetFevoriteListQuery,
  useGetAllCategoryQuery,
  useCreateYourOwnProfileMutation,
  useMarkasUnfevoriteMutation,
  useAboutUsQuery,
  useDisclaimarsQuery,
} = CategoryApi;

export default CategoryApi;
