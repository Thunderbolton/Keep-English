import axios from 'axios';
import { useEffect } from 'react';
import EntriesCollection from '../components/EntriesCollection';
import EntryForm from '../components/EntryForm';
import { useEntriesContext } from '../context/useEntriesContext';

const Home = () => {

    const { entries, dispatch } = useEntriesContext()

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