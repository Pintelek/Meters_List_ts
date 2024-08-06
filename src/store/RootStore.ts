import { Meter } from './models/Meter';
import {
  deleteMeterApi,
  fetchAddressById,
  fetchAllAddress,
  fetchMeters,
} from '../API/api';
import { flow, types } from 'mobx-state-tree';
import { Address } from './models/Address';

const RootStore = types
  .model({
    meters: types.maybe(types.array(Meter)), // Список счётчиков
    offset: types.optional(types.number, 0), // Смещение для пагинации
    total: types.optional(types.number, 0), // Общее количество счётчиков
    address: types.maybe(types.array(Address)),
  })
  .views((self) => ({
    // Вычисляем общее количество страниц
    get totalPages() {
      return Math.ceil(self.total / 20);
    },
    // Вычисляем текущую страницу
    get currentPage() {
      return Math.floor(self.offset / 20) + 1;
    },
  }))
  .actions((self) => {
    // Асинхронное действие для загрузки счётчиков
    const loadMeters = flow(function* () {
      try {
        const response = yield fetchMeters(self.offset);

        const metersData = response.data.results;

        // ========
        // Получаем уникальные ID адресов для параллельного запроса
        const areaIds = [
          ...new Set(
            metersData.map((meter: { area: { id: string } }) => meter.area.id)
          ),
        ];
        if (self.address && self.address.length > 0) {
          areaIds.forEach((id: string) => {
            if (self.address.some((el) => el.id === id)) {
              return;
            } else {
              const address = flow(function* () {
                const res = yield fetchAddressById(id);
                const dataAddress = res.data.results;
                self.address.push(dataAddress[0]);
              });
              address();
            }
          });
        } else {
          const allAddress = flow(function* () {
            const areasResponse = yield fetchAllAddress(areaIds);
            self.address.replace(areasResponse);
            return areasResponse;
          });
          allAddress();
        }
        self.meters = metersData;
        self.total = response.data.count;
      } catch (error) {
        console.error('Failed to load meters', error);
      }
    });

    // Асинхронное действие для удаления счётчика
    const deleteMeter = flow(function* (meterId) {
      try {
        yield deleteMeterApi(meterId);
        self.meters.replace(
          self.meters.filter((meter) => meter.id !== meterId)
        );
        if (self.meters.length < 20) {
          yield loadMeters();
        }
      } catch (error) {
        console.error('Failed to delete meter', error);
      }
    });
    // Действие для установки смещения и перезагрузки счётчиков
    const setOffset = flow(function* (newOffset) {
      self.offset = newOffset;
      yield loadMeters();
    });

    // Действие для загрузки следующей страницы
    const loadNextPage = flow(function* () {
      if (self.offset + 20 < self.total) {
        yield setOffset(self.offset + 20);
      }
    });

    // Действие для загрузки предыдущей страницы
    const loadPreviousPage = flow(function* () {
      if (self.offset - 20 >= 0) {
        yield setOffset(self.offset - 20);
      }
    });

    // Действие для загрузки страницы по её номеру
    const loadPage = flow(function* (pageNumber: number) {
      const newOffset = (pageNumber - 1) * 20;
      yield setOffset(newOffset);
    });

    // Вызываем loadMeters при создании
    const afterCreate = () => {
      loadMeters();
    };

    return {
      loadMeters,
      deleteMeter,
      setOffset,
      loadNextPage,
      loadPreviousPage,
      afterCreate,
      loadPage,
    };
  });

export default RootStore;
