import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    }),
    newPasswordRequest: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/reset-password/request`,
        method: 'POST',
        body: data,
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    }),
    resetPassword: builder.mutation({
      query: ({ userId, token, password }) => ({
        url: `${USERS_URL}/reset-password/reset/${userId}/${token}`,
        method: 'POST',
        body: { password },
        credentials: 'include', // send cookie (optional, safe to add)
      }),
      invalidatesTags: ['User']
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        credentials: 'include', // send cookie
      }),
      providesTags: ['User']
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        credentials: 'include', // send cookie
      }),
      providesTags: ['User']
    }),
    admins: builder.query({
      query: () => ({
        url: `${USERS_URL}/admins`,
        credentials: 'include', // send cookie
      }),
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        credentials: 'include', // send cookie
      }),
      providesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...userData }) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'PUT',
        body: { ...userData },
        credentials: 'include', // send cookie
      }),
      invalidatesTags: ['User']
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useNewPasswordRequestMutation,
  useResetPasswordMutation,
  useProfileMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useAdminsQuery
} = usersApiSlice;
