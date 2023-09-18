import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';


// Development Testing Only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        // Where is our JSON server located?
        baseUrl: 'http://localhost:3005',

        // DEV ONLY.  Used to see the spinnin arrow while loading.
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);  // fetch() is a built-in function in the browser.
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    }
                }
            }),


            addAlbum: builder.mutation({
                // Invalidate the tag when used.
                // The 3rd argument, 'user', is whatever we passed into our mutation function in AlbumsList.js file.  In our AlbumsList.js file - handleAddAlbum function, we passed int user: addAlbum(user);
                invalidatesTags: (result, error, user) => {
                    // Return an array with an object that has a type: 'Album' and an ID: user.id
                    return [{ type: 'UsersAlbums', id: user.id }];
                },

                // Tags:  whenever we run this query mutation, we are going to find the queries with a TAG of ALBUM and invalidate it.
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),


            // Give a simplified name: fetchAlbums
            fetchAlbums: builder.query({
                // Tags to invalidate requests
                // Name it after what you are trying to fetch.
                // It's usually with a CAPITOL LETTER and SINGULAR
                // Every query we make to fetchAlbums will be marked with this tag.
                // When we call providesTags, we get back RESULT and ERROR by default.  The third argument is what we are trying to access.  In this case, it is the 'user' because we want access to that particular user's ID.
                // Here, 'user', is passed into our useFetchAlbumsQuery(user) in AlbumsList.js file.
                // We recieve the arguments RESULT and ERROR however we are not using them.
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id }
                    })
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    return tags;
                },

                // Is this a query or a mutation?  THIS IS A QUERY.  WE ARE NOT CHANGING ANYTHING
                query: (user) => {  // USER here is what was passed in from our Component AlbumsList.js - const { data, error, isLoading } = useFetchAlbumsQuery(user);
                    return {
                        // What's the path for this request, relative to the baseURL?
                        url: '/albums',
                        params: {
                            // What's the query string for this request?
                            userId: user.id
                        },
                        // What's the method for this request?
                        method: 'GET',
                    } // What's the body for this request?  THERE IS NO BODY FOR THIS REQUEST SO WE DID NOT ADD A BODY TO THIS REQUEST
                }
            })
        }
    }
})

// We get automatically use the name useFetchAlbumsQuery from our endpoint of fetchAlbumsQuery.
export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} = albumsApi;

export { albumsApi };