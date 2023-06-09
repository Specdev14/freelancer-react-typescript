import { createSlice } from '@reduxjs/toolkit';
import { getuserDataFromStorage } from '../account/accountApi';
import { signInUser, signOutUser } from './authActions';

// initialize userToken from local storage
var userToken = getuserDataFromStorage();

export interface UserInterface {
    avatar_file_name: string | null;
    email: string;
    language: string
    name: string
    user_type: string,
    username: string
}

export interface AuthState {
    loading: boolean;
    success: boolean,
    message: string | null,
    userInfo: UserInterface | null;
}

const initialState: AuthState = {
    loading: false,
    success: false,
    message: null,
    userInfo: userToken // for user object
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetDefault: (state) => {
            state.success = false;
            state.message = null;
        },
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        //signin
        builder.addCase(signInUser.pending, (state: AuthState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(signInUser.fulfilled, (state: AuthState, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.userInfo = action.payload.data;
        })
        builder.addCase(signInUser.rejected, (state: AuthState, action) => {
            const payload = action.payload as AuthState;
            state.success = false;
            state.loading = false;
            state.message = payload.message;
        })

        //signout
        builder.addCase(signOutUser.pending, (state: AuthState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(signOutUser.fulfilled, (state: AuthState, action) => {
            state.loading = false;
            state.success = true;
            state.userInfo = null;
            state.message = action.payload.message;
        })
        builder.addCase(signOutUser.rejected, (state: AuthState, action) => {
            const payload = action.payload as AuthState;
            state.loading = false;
            state.success = false;
            state.message = payload.message;

        })
    }
});

const { resetDefault, updateUserInfo } = authSlice.actions;

export { resetDefault, updateUserInfo }
export default authSlice.reducer;