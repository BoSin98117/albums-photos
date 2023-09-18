import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";


function AlbumsList({ user }) {
    // Whenever we call this hook, we are immediately going to try to fetch some data.
    const { data, error, isFetching } = useFetchAlbumsQuery(user);  // Whatever we pass into this function, in this case it is 'user', it will be passed as the 3rd agrument in out providesTags function in the albumsApi.js file.

    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    }

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if (error) {
        content = <div>Error loading albums...</div>
    } else {
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album} />;
        })
    }


    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    + Add Album
                </Button>
            </div>

            <div>
                {content}
            </div>
        </div>
    )
}

export default AlbumsList;