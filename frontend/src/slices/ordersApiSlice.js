import { ORDERS_URL, RAZORPAY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
        credentials: 'include', // ✅ send JWT cookie
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`,
        credentials: 'include', // ✅ send JWT cookie
      }),
      providesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
        credentials: 'include', // ✅ send JWT cookie
      }),
      providesTags: ['Order'],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
        credentials: 'include', // ✅ send JWT cookie
      }),
      invalidatesTags: ['Order'],
    }),
    updateDeliver: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include', // ✅ send JWT cookie
      }),
      invalidatesTags: ['Order'],
    }),
    getRazorpayApiKey: builder.query({
      query: () => ({
        url: `${RAZORPAY_URL}/razorpay/config`,
        credentials: 'include', // ✅ send JWT cookie
      }),
      providesTags: ['Order'],
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials: 'include', // ✅ send JWT cookie
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useUpdateDeliverMutation,
  useGetRazorpayApiKeyQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice;
