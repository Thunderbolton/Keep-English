import { EntriesContext } from "./EntryContext";
import { useContext} from "react";

export const useEntriesContext = () => {
    const entryContext = useContext(EntriesContext)

    if (!entryContext) {
        throw Error('Cannot access Entries Context outside of Entries Context Provider')
    }
    
    return entryContext
}