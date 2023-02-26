import GlobalProvider from '@/contexts/Global';
import DefaultLayout from './layouts/default';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <DefaultLayout />
      </div>
    </GlobalProvider>
  );
}

export default App;
