import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function getSearchProducts(name, page) {
  const response = await axiosClient.get(`/produtos/search/produto?name=${name}&page=${page}`);
  return response.data;
}
