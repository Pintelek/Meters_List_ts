import useStore from '../hooks/useStore';
import { Meter } from '../store/models/Meter';
import { Address } from '../store/models/Address';

// Компонент для отображения строки счётчика

const MeterRow: React.FC<{
  meter: typeof Meter.Type;
  index: number;
  address: (typeof Address.Type)[];
}> = ({ meter, index, address }) => {
  const store = useStore();
  const handleDelete = () => {
    store.deleteMeter(meter.id);
  };
  const getAddress = () => {
    const data = address.find((el) => {
      return el.id === meter.area.id;
    });
    const str = data ? `${data.house.address} ${data.str_number_full}` : null;
    return str;
  };

  getAddress();

  const getType = () => {
    switch (meter._type[0]) {
      case 'HotWaterAreaMeter':
        return (
          <span className="type_icon">
            <img src="./src/assets/Icon-gvs.svg" /> ГВС
          </span>
        );
      case 'ColdWaterAreaMeter':
        return (
          <span className="type_icon">
            <img src="./src/assets/Icon-hvs.svg" /> ХВС
          </span>
        );
    }
  };
  return (
    <tr className="row_table_meters">
      <td>{index}</td>
      <td>{getType()}</td>
      <td>{new Date(meter.installation_date).toLocaleDateString()}</td>
      <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
      <td>{meter.initial_values}</td>
      <td>{address.length > 0 ? getAddress() : null}</td>
      <td className="description">{meter.description}</td>
      <td className="table_col_delete">
        <div className="btn-delete" onClick={() => handleDelete()}>
          <svg
            className="icon-delete"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.33334 6.00002V12H6.00001V6.00002H7.33334Z" />
            <path d="M10 6.00002V12H8.66668V6.00002H10Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.85284 0.666687H11.1472L11.8139 2.66669H14.6667V4.00002H13.3333L12.6667 15.3334H3.33334L2.66668 4.00002H1.33334V2.66669H4.18617L4.85284 0.666687ZM5.59163 2.66669H10.4084L10.1862 2.00002H5.81385L5.59163 2.66669ZM4.00001 4.00002L4.66668 14H11.3333L12 4.00002H4.00001Z"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
};

export default MeterRow;
