import { useContext } from 'react';
import { StoreContext } from '../App';

export default function useStore() {
  return useContext(StoreContext);
}
