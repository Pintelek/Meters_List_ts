import { observer } from 'mobx-react-lite';
import useStore from '../hooks/useStore';

// Компонент для цифровой пагинации
const Pagination: React.FC = observer(() => {
  const store = useStore();

  const renderPageNumbers = () => {
    const totalPages = store.totalPages;
    const currentPage = store.currentPage;
    let pages = [];

    if (totalPages <= 5) {
      // Если всего страниц 5 или меньше, отображаем их все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage > Math.floor(totalPages / 2)) {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push('...');
      if (currentPage > Math.floor(totalPages / 2)) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);
    } else {
      // Если больше 5 страниц, отображаем:
      // Первую страницу, ...
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages - 2);
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages.map((number, index) => {
      if (typeof number === 'string') {
        return <button key={index + number}>{number}</button>;
      } else {
        return (
          <button
            key={number}
            onClick={() => store.loadPage(number)}
            disabled={number === currentPage}
          >
            {number}
          </button>
        );
      }
    });
  };

  return <div className="pagination">{renderPageNumbers()}</div>;
});

export default Pagination;
