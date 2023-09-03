'use client'

import React from 'react';

import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';

export const ProviderQuery = ({ children }: {children: React.ReactNode}) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
