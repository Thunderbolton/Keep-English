import axios from 'axios';
import { useContext, useEffect } from 'react';
import EntriesCollection from '../components/EntriesCollection';
import EntryForm from '../components/EntryForm';
import { EntriesContext } from '../context/EntryContext';

const Home = () => {

    const {entries, dispatch } = useContext(EntriesContext)

    useEffect(() => {
        const fetchEntries = async () => {
        const response = await axios.get(`http://localhost:5000/api/entries`)
        
        if(response) {
        dispatch({type: 'set_entries', payload: response.data})
        }
    }
    fetchEntries()
  },[])

    return ( 
        <>
          <EntryForm />
          <EntriesCollection entries={entries} />
        </>
     );
}
 
export default Home;