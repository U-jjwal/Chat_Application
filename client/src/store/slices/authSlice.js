import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/me", async(_, thunkAPI) => {
    try {
        const res =  await axiosInstance.get("/user/me");
        connectSocket(res.data.user);
        return res.data.user;
    } catch (error) {
        console.log("Error fetching user:", error);
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
    }
});

export const logout = createAsyncThunk("user/sign-out", async(_, thunkAPI) => {
    try {
        await axiosInstance.get("/user/sign-out");
        disconnectSocket();
        return null;
    } catch (error) {
        toast.error(error.response.data.message || "Failed to log out");
        return thunkAPI.rejectWithValue(error.response.data.message || "Failed to log out");
    }
});


export const login = createAsyncThunk("user/sign-in", async(data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/user/sign-in", data);
        connectSocket(res.data.user);
        toast.success("Logged in successfully");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message || "Failed to log in");
        return thunkAPI.rejectWithValue(error.response.data.message || "Failed to log in");
    }
});

export const signup = createAsyncThunk(
    "auth/sign-up",
     async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/user/sign-up", data);
        connectSocket(res.data.user);
        toast.success("Account created successfully");
        return res.data;  
    } catch (error) {
        toast.error(error.response.data.message || "Failed to create account");
        return thunkAPI.rejectWithValue(error.response.data.message || "Failed to create account");
    }
});

export const updateProfile = createAsyncThunk(
    "user/update-profile",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.put("/user/update-profile", data);
            toast.success("Profile updated successfully");
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)



const authSlice =  createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: [],
        notifications: {},
    },
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        setNotification: (state, action) => {
            const { fromUserId } = action.payload;
            state.notifications[fromUserId] = true;
            
            try {
              localStorage.setItem('chatNotifications', JSON.stringify(state.notifications));
            } catch (error) {
              console.error('Error saving notification:', error);
            }
          },
          
          clearNotification: (state, action) => {
            const { fromUserId } = action.payload;
            delete state.notifications[fromUserId];
           
            try {
              localStorage.setItem('chatNotifications', JSON.stringify(state.notifications));
            } catch (error) {
              console.error('Error clearing notification:', error);
            }
          },
        
    },


    extraReducers: (builder) => {
        builder
        .addCase(getUser.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isCheckingAuth = false;
        })
        .addCase(getUser.rejected, (state) => {
            state.authUser = null;
            state.isCheckingAuth = false;
        })
        .addCase(logout.fulfilled, (state) => {
            state.authUser = null;
        })
        .addCase(logout.rejected, (state) => {
            state.authUser = state.authUser;
        })
        .addCase(login.pending, (state) => {
            state.isLoggingIn = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isLoggingIn = false;
        })
         .addCase(login.rejected, (state) => {
            state.isLoggingIn = false;
        })
        .addCase(signup.pending, (state) => {
            state.isSigningUp = true;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isSigningUp = false;
        })
        .addCase(signup.rejected, (state) => {
            state.isSigningUp = false;
        })
        .addCase(updateProfile.pending, (state) => {
            state.isUpdatingProfile = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isUpdatingProfile = false;
        })
        .addCase(updateProfile.rejected, (state) => {
            state.isUpdatingProfile = false;
        });
    }  
});

export const { setOnlineUsers, setNotification,  clearNotification } = authSlice.actions;

export default authSlice.reducer; 