import {MRT_ColumnDef} from 'material-react-table';
import {Person} from '@/models/persons/persons-model';

export const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
  },
  {
    accessorKey: 'visits',
    header: 'Visits',
  },
];
