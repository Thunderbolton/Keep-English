import axios from 'axios';
import { useEffect, useState } from 'react';

import EntriesCollection from './components/EntriesCollection';
import EntryForm from './components/EntryForm';
import Header from './components/Header';
import { useEntriesContext } from './context/useEntriesContext';

interface Entry {
  comments: string
  createdAt: number
  title: string
  text: string
  updatedAt: number
  _id: number
}

const App = () => {

  // const [entries, setEntries] = useState<Entry[]>([])

  const { entries, dispatch } = useEntriesContext()

  useEffect(() => {
    const fetchEntries = async () => {
    const response = await axios.get<Entry[]>(`http://localhost:5000/api/entries`)
    
    // setEntries(response.data)
    if(response) {
       dispatch({type: 'set_entries', payload: response.data})
    }
    // console.log(response.data)
  }
    fetchEntries()
  },[])

  // const deleteEntry = async (_id: number) => {
  //     await axios.delete(`http://localhost:5000/api/entries/${_id}`)

  //     const filteredEntries = entries.filter(entry => entry._id !== _id)
  //     setEntries(filteredEntries)
  // }

  return (
    <div className="App">
      <Header />
      <EntryForm />
      <EntriesCollection entries={entries} />
    </div>
  );
}

export default App;
