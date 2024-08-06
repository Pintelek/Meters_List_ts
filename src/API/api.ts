import axios from 'axios';

const API_BASE_URL = 'http://showroom.eis24.me/api/v4/test';

// Функция для получения списка счётчиков с параметрами пагинации
export const fetchMeters = (offset: number) => {
  // return getMeters(20, offset);
  return axios.get(`${API_BASE_URL}/meters/`, {
    params: { limit: 20, offset },
  });
};

// Функция для получения списка адресов по ID
export const fetchAllAddress = async (ids: any) => {
  const idPromise = ids.map((id: string) => {
    return axios.get(`${API_BASE_URL}/areas/`, { params: { id } });
  });

  const res = await Promise.all(idPromise).then((data) => {
    const result = data.map((el) => el.data.results[0]);

    return result;
  });

  return res;
};

export const fetchAddressById = async (id: string) => {
  return axios.get(`${API_BASE_URL}/areas/`, { params: { id__in: id } });
  // return getAddress(id);
};

// Функция для удаления счётчика по его ID
export const deleteMeterApi = (meterId: string) => {
  return axios.delete(`${API_BASE_URL}/meters/${meterId}/`);
};
