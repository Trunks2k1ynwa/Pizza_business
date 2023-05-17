import { default as http } from './http.js';

export const getProvinces = async () => {
  const response = await http.get(
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
    {
      headers: {
        'Content-Type': 'application/json',
        Token: 'ef36bb53-f016-11ed-943b-f6b926345ef9',
      },
    },
  );
  const provinces = response.data.data;
  return provinces;
};

export const getDistricts = async (code) => {
  const response = await http.get(
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
    {
      headers: {
        'Content-Type': 'application/json',
        Token: 'ef36bb53-f016-11ed-943b-f6b926345ef9',
        province_id: code,
      },
    },
  );
  const districts = response.data.data;
  return districts;
};
export const getWards = async (code) => {
  const response = await http.get(
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
    {
      headers: {
        'Content-Type': 'application/json',
        Token: 'ef36bb53-f016-11ed-943b-f6b926345ef9',
        province_id: code,
      },
    },
  );
  const wards = response.data.data;
  return wards;
};
