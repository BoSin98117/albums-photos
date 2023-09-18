import { GoTrash } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from './PhotosList';


function AlbumsListItem({ album }) {
    // Call the HOOK
    // Whenever we call a MUTATION HOOK, we get back an ARRAY with a couple elements inside it.
    // 1st arg = function we call that does the mutation.
    // 2nd arg = results object that tells us the STATUS OF MUTATION.
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    }

    const header = (
        <>
            <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveAlbum}>
                <GoTrash />
            </Button>
            {album.title}
        </>
    )
    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}

export default AlbumsListItem;