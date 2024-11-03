// src/features/api/employeeApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmployeeLeave } from "@/modules/employees/services/employeeLeaveApiSlice";
import { baseUrl } from "@/utils/baseApiQuery";

export interface Employee {
  id?: number;
  initialName: string;
  lastName: string;
  email: string;
  gender: string;
  mobilePhoneNumber: string;
  address: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  employeeLeaves?: EmployeeLeave[];
}

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    fetchEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: ["Employee"]
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }]
    }),
    addEmployee: builder.mutation<void, Partial<Employee>>({
      query: (newEmployee) => ({
        url: "/employees",
        method: "POST",
        body: newEmployee
      }),
      invalidatesTags: ["Employee"]
    }),
    updateEmployee: builder.mutation<
      void,
      { id: number; employee: Partial<Employee> }
    >({
      query: ({ id, employee }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: employee
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Employee", id }]
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (result, error, id) => [{ type: "Employee", id }]
    })
  })
});

export const {
  useFetchEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} = employeeApi;
