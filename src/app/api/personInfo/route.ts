import { NextResponse } from 'next/server';

import {PERSONS} from '@/app/api/db/db';
export async function POST(req: any) {
  const { personId } = await req.json();

  const fetchData = async () => {
    return [...PERSONS]
      .filter(person => person.userId === personId)
      .reduce((acc, item) => {
        acc = item;

        return acc;
      }, {});
  };

  const result = await fetchData();

  return NextResponse.json(result, { status: 201});
}
