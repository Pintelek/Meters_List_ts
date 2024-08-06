import { types } from 'mobx-state-tree';

const HouseModel = types.model('House', {
  address: types.string,
  fias_addrobjs: types.array(types.string),
  id: types.string,
});

export const Address = types.model('RootStore', {
  house: HouseModel,
  id: types.string,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
});
