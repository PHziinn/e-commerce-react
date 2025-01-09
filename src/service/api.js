import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Produtos
export async function postProdutos(dataProduto) {
  const response = await axiosClient.post(`/produtos`, dataProduto);

  return response.data;
}
export async function getAllProdutos(name, page) {
  const response = await axiosClient.get(`/produtos?page=${page}`);

  return response.data;
}
export async function getProduto(sku) {
  const response = await axiosClient.get(`/produtos/${sku}`);

  return response.data;
}
export async function patchProdutos(id, updatedProduto) {
  const response = await axiosClient.patch(`/produtos/${id}`, updatedProduto);

  return response.data;
}
export async function deleteProdutos(id) {
  const response = await axiosClient.delete(`/produtos/${id}`);

  return response.data;
}
export async function getSearchProducts(name, page) {
  const response = await axiosClient.get(`/produtos/search/produto?name=${name}&page=${page}`);
  return response.data;
}
export async function getFiltersPrice(maxPrice, minPrice) {
  const response = await axiosClient.get(
    `/produtos/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
  );

  return response.data;
}

// Usuarios
export async function createUsuario(createUsuario) {
  const response = await axiosClient.post(`/cadastro`, createUsuario);

  return response.data;
}
export async function getAllUsuarios(name, page) {
  const response = await axiosClient.get(`/usuarios?page=${page}`);

  return response.data;
}
export async function getByUsuario(id) {
  const response = await axiosClient.get(`/usuarios/${id}`);

  return response.data;
}
export async function patchUsuarios(id, updatedUsuario) {
  const response = await axiosClient.patch(`/usuarios/${id}`, updatedUsuario);

  return response.data;
}
export async function deleteUsuarios(id) {
  const response = await axiosClient.delete(`/usuarios/${id}`);

  return response.data;
}

// Endereços
export async function createAddress(updatedAddress) {
  const response = await axiosClient.post(`/enderecos`, updatedAddress);

  return response.data;
}
export async function patchAddress(id, updatedAddress) {
  const response = await axiosClient.patch(`/enderecos/${id}`, updatedAddress);

  return response.data;
}
export async function deleteAddress(id) {
  const response = await axiosClient.delete(`/enderecos/${id}`);

  return response.data;
}

// Settings
export async function getAllSettings() {
  const response = await axiosClient.get(`/settings`);

  return response.data;
}
export async function patchSettings(id, updatedSettings) {
  const response = await axiosClient.patch(`/settings/${id}`, updatedSettings);

  return response.data;
}

// Via CEP
export async function fetchAddressByCep(cep) {
  const response = await axiosClient.get(`/proxy/viacep/${cep}`);

  return response.data;
}
