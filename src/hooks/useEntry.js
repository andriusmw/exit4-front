
import { useEffect, useState } from "react"
import { getSingleEntryService } from "../services";


const useEntry = (id) => {
    const [entry, setEntry ] = useState(null);
    const [loading, setLoding] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEntry = async () => {
            try {
                setLoding(true);
                const data = await getSingleEntryService(id);

                setEntry(data);

            } catch (error) {
                setError(error.message)
            } finally {
                setLoding(false);
            }
        }

        loadEntry();
    }, [id]);

    return {entry, loading, error};
}


export default useEntry;