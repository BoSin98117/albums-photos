import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    // Development Testing Only
    await pause(1000);

    return response.data;
});

// Development Testing Only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export { fetchUsers };