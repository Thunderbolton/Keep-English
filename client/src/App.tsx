import axios from 'axios';
import { useEffect, useState } from 'react';

import EntriesCollection from './components/EntriesCollection';
import EntryForm from './components/EntryForm';
import Header from './components/Header';


const App = () => {

  const [entries, setEntries] = useState<string[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
    const result = await axios(`http://localhost:5000/api/entries`)
    
    console.log(result.data)
    setEntries(result.data)
  }
    fetchEntries()
  },[])

  return (
    <div className="App">
      <Header />
      <EntryForm title='Entry form' />
      <EntriesCollection entries={entries} setEntries={setEntries}/>
    </div>
  );
}

export default App;
