import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";//
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
    reducer: {
        users: usersReducer,
        // This syntax DOES NOT CREATE AN ARRAY.  
        // This syntax means go and look up the reducerPath property which is a string.  Whatever that string is, put a new key inside the object [albumsApi.reducerPath]
        [albumsApi.reducerPath]: albumsApi.reducer,

        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    }
})

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';

export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} from './apis/albumsApi';

export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} from './apis/photosApi';