import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    passwords: [],
    loading: false,
    message: null,
    status: null,
};

export const createPassword = createAsyncThunk(
    'password/createPassword',
    async ( { name, url, username, password } ) => {
        try {
            const { data } = await axios.post('/passwords', {
                name,
                url,
                username,
                password,
            });

            return data;
        } catch (error) {
            console.log(error);
        }
});

export const updatePassword = createAsyncThunk(
    'password/updatePassword',
    async ( { name, url, username, password, id } ) => {
        try {
            const { data } = await axios.put('/passwords', {
                name,
                url,
                username,
                password,
                id,
            });

            return data;
        } catch (error) {
            console.log(error);
        }
});

export const deletePassword = createAsyncThunk(
    'password/deletePassword',
    async ( { id } ) => {
        console.log(  `id: ${ id }`  );
        try {
            console.log(id);
            const { data } = await axios.delete('/passwords/delpass', { id, });

            return data;
        } catch (error) {
            console.log(error);
        }
});

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {},
    extraReducers: {
        // Create password
        [createPassword.pending]: (state) => {
            state.loading = true;
            state.message = 'Ваш запрос обрабатывается...';
            state.status = 'pending';
        },
        [createPassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.passwords.push(action.payload.password);
        },
        [createPassword.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        // Update password
        [updatePassword.pending]: (state) => {
            state.loading = true;
            state.message = 'Ваш запрос обрабатывается...';
            state.status = 'pending';
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.passwords.push(action.payload.password);
        },
        [updatePassword.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        // Delete password
        [deletePassword.pending]: (state) => {
            state.loading = true;
            state.message = 'Ваш запрос обрабатывается...';
            state.status = 'pending';
        },
        [deletePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.passwords = state.passwords.filter((pass) => pass._id !== action.payload._id);
        },
        [deletePassword.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
    },
});

export default passwordSlice.reducer;