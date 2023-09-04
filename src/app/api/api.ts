import axios from 'axios';

const PERSONS_URL = process.env.NODE_ENV === 'production'
  ? 'https://table-virtualized-scroll.vercel.app'
  : 'http://localhost:3000';

const PERSONS_INFO_URL = process.env.NODE_ENV === 'production'
  ? 'https://table-virtualized-scroll.vercel.app'
  : 'http://localhost:3000';

export const getPersons = (start:number, size:number, globalFilter:string | undefined) => {
  return axios({
    method: 'post',
    url: `${PERSONS_URL}/api/persons`,
    data: {
      start,
      size,
      globalFilter,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error:', error);

      return {
        person: [],
        meta: { totalRowCount: 0 }
      };
    });
}

export const getPersonInfo = (personId:string) => {
  return axios({
    method: 'post',
    url: `${PERSONS_INFO_URL}/api/personInfo`,
    data: { personId },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error:', error);
    });
}
