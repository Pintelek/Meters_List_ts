import { types } from 'mobx-state-tree';

// Определяем модель Meter с необходимыми полями и их типами
export const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  is_automatic: types.maybeNull(types.boolean),
  description: types.maybeNull(types.string),
  installation_date: types.string,
  initial_values: types.array(types.number),
  area: types.model('Area', { id: types.string }),
});
