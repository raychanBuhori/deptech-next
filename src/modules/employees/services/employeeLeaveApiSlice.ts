// api/employeeLeavesApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/utils/baseApiQuery";

// Define the type for EmployeeLeave
export interface EmployeeLeave {
  id?: number;
  userId: number; // Assuming it references a user by ID
  leaveStartDate: Date;
  leaveEndDate: Date;
  reason: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const employeeLeavesApi = createApi({
  reducerPath: "employeeLeavesApi",
  baseQuery: fetchBaseQuery({ baseUrl }), // Adjust your base URL as needed
  tagTypes: ["EmployeeLeave"],
  endpoints: (builder) => ({
    // Fetch all employee leaves
    fetchEmployeeLeaves: builder.query<EmployeeLeave[], void>({
      query: () => "/employee-leaves",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "EmployeeLeave" as const,
                id
              })),
              { type: "EmployeeLeave", id: "LIST" }
            ]
          : [{ type: "EmployeeLeave", id: "LIST" }]
    }),

    // Fetch single employee leave by ID
    fetchEmployeeLeaveByUserId: builder.query<EmployeeLeave, number>({
      query: (userId) => `/employee-leaves/${userId}`,
      providesTags: (result, error, id) => [{ type: "EmployeeLeave", id }]
    }),

    // Fetch single employee leave by ID
    fetchEmployeeLeaveById: builder.query<EmployeeLeave, number>({
      query: (id) => `/employee-leaves/${id}`,
      providesTags: (result, error, id) => [{ type: "EmployeeLeave", id }]
    }),

    // Create a new employee leave
    createEmployeeLeave: builder.mutation<
      EmployeeLeave,
      Partial<EmployeeLeave>
    >({
      query: (newLeave) => ({
        url: "/employee-leaves",
        method: "POST",
        body: newLeave
      }),
      invalidatesTags: [{ type: "EmployeeLeave", id: "LIST" }]
    }),

    // Update an existing employee leave by ID
    updateEmployeeLeave: builder.mutation<
      EmployeeLeave,
      { id: number; leave: Partial<EmployeeLeave> }
    >({
      query: ({ id, leave }) => ({
        url: `/employee-leaves/${id}`,
        method: "PUT",
        body: leave
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "EmployeeLeave", id }
      ]
    }),

    // Delete an employee leave by ID
    deleteEmployeeLeave: builder.mutation<
      { success: boolean; id: number },
      number
    >({
      query: (id) => ({
        url: `/employee-leaves/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [
        { type: "EmployeeLeave", id },
        { type: "EmployeeLeave", id: "LIST" }
      ]
    })
  })
});

export const {
  useFetchEmployeeLeavesQuery,
  useFetchEmployeeLeaveByIdQuery,
  useCreateEmployeeLeaveMutation,
  useUpdateEmployeeLeaveMutation,
  useDeleteEmployeeLeaveMutation
} = employeeLeavesApi;
