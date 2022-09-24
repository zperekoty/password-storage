import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
    message: null,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ( { login, password, name, telegram, instagram } ) => {
        try {
            const { data } = await axios.post('/auth/registration', {
                login,
                password,
                name,
                telegram,
                instagram,
            });

            if (data.jwtoken) {
                window.localStorage.setItem('jwtoken', data.jwtoken);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
},);

export const authUser = createAsyncThunk(
    '/auth/authUser',
    async ( { login, password } ) => {
        try {
            const { data } = await axios.post('/auth/authorization', {
                login,
                password,
            });

            if (data.jwtoken) {
                window.localStorage.setItem('jwtoken', data.jwtoken);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
},);

export const get = createAsyncThunk('/auth/get', async () => {
    try {
        const { data } = await axios.get('auth/get');

        return data;
    } catch (error) {
        console.log(error);
    }
},);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.status = null;
            state.message = null;
            state.token = null;
        },
    },
    extraReducers: {
        // Register
        [registerUser.pending]: (state) => {
            state.isLoading = true;
            state.status = 'pending';
            state.message = 'Ваш запрос обрабатывается...';
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.user = action.payload.user;
            state.token = action.payload.jwtoken;
        },
        [registerUser.rejected]: (state, action) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.isLoading = false;
        },

        // Auth
        [authUser.pending]: (state) => {
            state.isLoading = true;
            state.status = 'pending';
            state.message = 'Ваш запрос обрабатывается...';
        },
        [authUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.user = action.payload.user;
            state.token = action.payload.jwtoken;
        },
        [authUser.rejected]: (state, action) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.isLoading = false;
        },

        // Get
        [get.pending]: (state) => {
            state.isLoading = true;
            state.status = null;
            state.message = null;
        },
        [get.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.message = null;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.jwtoken;
            state.redirect = action.payload.redirect;
        },
        [get.rejected]: (state, action) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.isLoading = false;
        },
    },
});

export const isAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;