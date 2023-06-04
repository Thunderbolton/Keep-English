import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { EntriesContext } from "../context/EntryContext";

export const SignOut = () => {
    const { dispatch } = useContext(AuthContext)
    const { dispatch: EntriesDispatch } = useContext(EntriesContext)

    const signout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'SIGNOUT' })
        EntriesDispatch({ type: 'set_entries', payload: []})

    }
    return { signout }
}