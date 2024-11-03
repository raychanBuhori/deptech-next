import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/utils/baseApiQuery";

export interface User {
  id?: number;
  initialName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: string;
  password: string;
  isActive?: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials
      })
    }),
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" }
            ]
          : [{ type: "User", id: "LIST" }]
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" }
      ]
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" }
      ]
    }),
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, userId) => [
        { type: "User", id: userId },
        { type: "User", id: "LIST" }
      ]
    })
  })
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi;
