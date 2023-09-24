import axios from 'axios';
import { useContext, useEffect } from 'react';
import EntriesCollection from '../components/EntriesCollection';
import EntryForm from '../components/EntryForm';
import { EntriesContext } from '../context/EntryContext';
import { AuthContext } from "../context/AuthContext";

const Home = () => {

    const { dispatch } = useContext(EntriesContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if(!user) {
          return
        }

        const fetchEntries = async () => {

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';  
        const response = await axios.get(`${apiUrl}/api/entries`, {
          headers: {
            'Authorization' : `Bearer ${user.token}`
          }
        })
        
        if(response) {
        dispatch({ type: 'set_entries', payload: response.data })
        }
    }
    fetchEntries()
  },[user])

    return ( 
        <>
          <EntryForm />
          <EntriesCollection />
        </>
     );
}
 
export default Home;