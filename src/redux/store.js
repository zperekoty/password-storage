import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import passwordSlice from './features/password/passwordSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        password: passwordSlice,
    },

});

export default store;