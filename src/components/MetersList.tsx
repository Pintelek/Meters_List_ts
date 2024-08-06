import MeterRow from './MeterRow';
import useStore from '../hooks/useStore';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import Pagination from './Paginator';

// // Компонент для отображения списка счётчиков

//   // Загружаем данные при монтировании компонента

const MetersList: React.FC = observer(() => {
  const store = useStore();
  const dataMeters: any = getSnapshot(store);

  return (
    <div className="container">
      <h1 className="meters_title">Список счётчиков</h1>
      <div className="table-container">
        <table className="table_meters">
          <thead className="table_meters_header">
            <tr>
              <th>№</th>
              <th>Тип</th>
              <th>Дата установки</th>
              <th>Автоматический</th>
              <th>Текущие показания</th>
              <th>Адрес</th>
              <th>Примечание</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataMeters.meters.length !== 0
              ? dataMeters.meters.map((meter: any, index: number) => (
                  <MeterRow
                    key={meter.id}
                    address={dataMeters.address}
                    meter={meter}
                    index={index + 1}
                  />
                ))
              : null}
          </tbody>
        </table>
        <div className="pagination-wrap">
          <Pagination />
        </div>
      </div>
    </div>
  );
});

export default MetersList;
