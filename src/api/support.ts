import { SERVER_URL } from '../constants';
import { apiSlice } from './api';

export const supportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        contactSupport: builder.mutation({
            query: (body) => ({
                url: `${SERVER_URL}/auth/contact-us`,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const { useContactSupportMutation } = supportApiSlice;
