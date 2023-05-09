import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const SignOut = () => {
    const { dispatch } = useContext(AuthContext)

    const signout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'SIGNOUT' })

    }
    return {signout}
}