import axios from 'axios';

export const getPersons = (start:number, size:number, globalFilter:string) => {
  return axios({
    method: 'post',
    // url: 'http://localhost:3000/api/persons',
    url: 'https://table-virtualized-scroll.vercel.app/api/persons',
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
    // url: 'http://localhost:3000/api/personInfo',
    url: 'https://table-virtualized-scroll.vercel.app/api/personInfo',
    data: { personId },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error:', error);
    });
}
