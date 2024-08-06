import { createContext } from 'react';
import './App.css';
import MetersList from './components/MetersList';
import RootStore from './store/RootStore';

const store = RootStore.create({ meters: [], offset: 0, address: [] });

export const StoreContext = createContext(store);
function App() {
  return (
    <StoreContext.Provider value={store}>
      <>
        <MetersList />
      </>
    </StoreContext.Provider>
  );
}

export default App;
