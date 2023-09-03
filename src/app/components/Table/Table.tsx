import React, {FC, UIEvent, useCallback, useEffect, useRef, useState} from 'react';

import MaterialReactTable, {MRT_Virtualizer} from 'material-react-table';
import {columns} from '@/app/components/Table/columns/columns';
import {TableDto} from '@/models/models';
import {ModalComponent} from '@/app/components/ModalComponent/ModalComponent';
import {Typography} from '@mui/material';
export const Table:FC<TableDto> = (
{
  isLoading,
  isFetching,
  isError,
  totalFetched,
  totalDBRowCount,
  fetchNextPage,
  persons,
  globalFilter,
  setGlobalFilter,
}) => {
  const [rowSelection, setRowSelection] = useState('');
  const [open, setOpen] = useState(false);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [isFetching, totalFetched, totalDBRowCount, fetchNextPage],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <div className="table-container">
      <MaterialReactTable
        columns={columns}
        data={persons}
        enablePagination={false}
        enableRowNumbers
        enableRowVirtualization
        manualFiltering
        manualSorting
        enableColumnActions={false}
        enablePinning={false}
        enableSorting={false}
        muiTableContainerProps={{
          ref: tableContainerRef,
          sx: { maxHeight: '600px' },
          onScroll: (
            event: UIEvent<HTMLDivElement>,
          ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
        }}
        getRowId={(row) => row.userId}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setRowSelection(row.id)
            setOpen(true)
          },
          sx: {
            cursor: 'pointer',
          },
        })}
        onGlobalFilterChange={setGlobalFilter}
        muiToolbarAlertBannerProps={
          isError
            ? {
              color: 'error',
              children: 'Error loading data',
            }
            : undefined
        }
        state={{
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isFetching,
          globalFilter,
        }}
        rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
        rowVirtualizerProps={{ overscan: 4 }}
        renderBottomToolbarCustomActions={() => (
          <Typography>
            Fetched {totalFetched} of {totalDBRowCount} total rows.
          </Typography>
        )}
      />

      <ModalComponent
        open={open}
        setOpen={setOpen}
        personId={rowSelection}
      />
    </div>
  )
};
