import { api } from "../../baseApi"; 

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body
      }),
     
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response) => {
        try {
          return typeof response === 'string' ? JSON.parse(response) : response;
        } catch (err) {
          console.error('JSON Parse Error:', err);
          return response;
        }
      },
    }),
    



      // IT WILL TAKE EMAIL TO VERIFY EMAIL-------------------------------
      verifyEmail: builder.mutation({
        query: (body) => ({
          url: `/resent-otp`, 
          method: "POST",
          body,
        }),
        
      }),


      // IT WILL TAKE OTP TO VERIFY-------------------------------
      verifyOtp: builder.mutation({
        query: (body) => ({
          url: `/verify-email`, 
          method: "POST",
          body,
        }),
        
      }),



      //IT WILL TAKE OLD PAS NEW PASS CONFIRM PASS TO UPDATE PASSWORD
      resetPassword: builder.mutation({
        query: (body) => ({
          url: `/update-password`, 
          method: "POST",
          body,
        }),
        
      }),

      Logout: builder.mutation({
        query: (body) => ({
          url: `/logout`, 
          method: "POST",
          body,
        }),
        
      }),

      GetMyprofile: builder.query({
        query: () => ({
          url: `/user/profile`, 
        }),
        
      }),

      // USR PROFILE INFORMATION HERE -------------------------------

      updatePersonalInformation : builder.mutation({
        query: (body) => ({
          url: `/update-profile`, 
          method: "POST",
          body,
        }),
        providesTags: ['User'],
        
      }),

      updateProfilePasswod : builder.mutation({
        query: (body) => ({
          url: `/update-password`, 
          method: "POST",
          body,
        }),
        providesTags: ['User'],
        
      }),

      getLawyers: builder.query({
        query: ({ per_page, page }) => ({
          url: `/lawyer/all-lawyers?per_page=${per_page}&page=${page}`,
          method: 'GET',
        }),
        invalidatesTags: ['Lawyer'],
      }),

      getuserinfoById: builder.query({
        query: (id) => ({
          url: `/user/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['User'],
      }),
  }), 
});

export const { useRegisterUserMutation, useLoginUserMutation, useVerifyEmailMutation, useVerifyOtpMutation, useResetPasswordMutation, useLogoutMutation, useUpdatePersonalInformationMutation, useUpdateProfilePasswodMutation, useGetLawyersQuery, useGetMyprofileQuery, useGetuserinfoByIdQuery} = userApi;
export default userApi; 
