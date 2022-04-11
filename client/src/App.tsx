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
}

const App = () => {

  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
    const response = await axios.get<Entry[]>(`http://localhost:5000/api/entries`)
    
    setEntries(response.data)
    
    // console.log("Response: ", response.data)
  }
    fetchEntries()
  },[])

  return (
    <div className="App">
      <Header />
      <EntryForm title='Entry form' />
      <EntriesCollection entries={entries} />
    </div>
  );
}

export default App;
