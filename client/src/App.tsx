import EntryForm from './components/EntryForm';
import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <EntryForm title='Entry form' />
    </div>
  );
}

export default App;
