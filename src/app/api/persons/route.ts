import { NextResponse } from 'next/server';

import {PERSONS} from '@/app/api/db/db';
export async function POST(req: any) {
  const { start, size, globalFilter } = await req.json();

  const fetchData = async () => {
    let dbData = [...PERSONS];

    if (globalFilter) {
      dbData = dbData
        .filter(data => data.firstName.toLowerCase().includes(globalFilter.toLowerCase()));
    }

    return {
      person: dbData.slice(parseInt(start), parseInt(start) + parseInt(size)),
      meta: {
        totalRowCount: dbData.length,
      },
    };
  };

  const result = await fetchData();

  return NextResponse.json({ ...result }, { status: 201});
}
