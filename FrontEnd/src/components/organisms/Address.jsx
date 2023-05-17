/* eslint-disable no-undef */
import { Controller } from 'react-hook-form';

const Address = () => {
  return (
    <div>
      <Controller
        name='provinces'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <select
            {...field}
            className='bg-semi col-span-2 px-6 py-5 rounded-md'
            name='provinces'
            id=''
          >
            {province.map((pro) => (
              <option id={pro.ProvinceID} key={uuidv4()} value={pro.ProvinceID}>
                {pro.ProvinceName}
              </option>
            ))}
          </select>
        )}
      />
      <Controller
        name='distric'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <select
            {...field}
            className='bg-semi col-span-2 px-6 py-5 rounded-md'
            name='distric'
            id=''
          >
            {district.map((dis) => (
              <option
                id={dis.DistrictID}
                key={uuidv4()}
                value={dis.DistrictName}
              >
                {dis.DistrictName}
              </option>
            ))}
          </select>
        )}
      />
      <Controller
        name='provinces'
        rules={{ required: true }}
        render={({ field }) => (
          <select
            {...field}
            className='bg-semi col-span-2 px-6 py-5 rounded-md'
            name='provinces'
            id=''
            value='ksạ'
          >
            {province.map((pro) => (
              <option
                id={pro.ProvinceID}
                key={uuidv4()}
                value={pro.ProvinceName}
              >
                {pro.ProvinceName}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default Address;
