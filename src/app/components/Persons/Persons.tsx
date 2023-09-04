'use client';

import React, {useState} from 'react';
import {getPersons} from '@/app/api/api';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Table} from '@/app/components/Table/Table';
import {Spinner} from '@/app/components/Spinner/Spinner';

const fetchSize = 25;
export const Persons = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const searchValue = () => {
    if (globalFilter?.length >= 3) {
      return globalFilter;
    }

    return;
  }

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery(
      ['table-data', searchValue()],
      async ({ pageParam = 0 }) => {
        const start = pageParam * fetchSize;

        return getPersons(start, fetchSize, searchValue());
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );

  const persons = data?.pages.reduce((acc, page) => [...acc, ...page.person], []);

  const totalDBRowCount = data?.pages[0].meta.totalRowCount ?? 0;
  const totalFetched = persons && persons.length;

  return (
    <>
      <h1 className="title">Persons</h1>

      <div className="container">
        {
          isLoading ? (
              <Spinner />
            ) : (
              <Table
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                totalFetched={totalFetched}
                totalDBRowCount={totalDBRowCount}
                fetchNextPage={fetchNextPage}
                persons={persons}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
          )
        }
      </div>
    </>
  )
}
