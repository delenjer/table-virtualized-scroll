import {FetchNextPageOptions, InfiniteQueryObserverResult} from '@tanstack/query-core';
import {Person} from '@/models/persons/persons-model';

export interface TableDto {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  totalFetched: number;
  totalDBRowCount: number;
  fetchNextPage: <TData>(fetchNextPageOptions?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<TData>>;
  persons: Person[];
  globalFilter: string;
  setGlobalFilter: (arg0:string) => void;
}
