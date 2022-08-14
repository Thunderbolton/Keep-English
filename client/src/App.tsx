import axios from 'axios';
import { useEffect, useState } from 'react';

import EntriesCollection from './components/EntriesCollection';
import EntryForm from './components/EntryForm';
import Header from './components/Header';

interface Entry {
  comments: string
  createdAt: number
  title: string
  text: string
  updatedAt: number
  _id: number
  // deleteEntry: (_id: number) => void;
}

const App = () => {

  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
    const response = await axios.get<Entry[]>(`http://localhost:5000/api/entries`)
    
    setEntries(response.data)
    
    // console.log("Response: ", response.data)

    // console.log(response.data)
  }
    fetchEntries()
  },[])

  const deleteEntry = async (_id: number) => {
      await axios.delete(`http://localhost:5000/api/entries/${_id}`)

      const filteredEntries = entries.filter(entry => entry._id !== _id)
      setEntries(filteredEntries)
  }

  return (
    <div className="App">
      <Header />
      <EntryForm title='Entry form' />
      <EntriesCollection entries={entries} deleteEntry={deleteEntry} />
    </div>
  );
}

export default App;
