import type { Meta, StoryObj } from '@storybook/react';
import { DataTable} from './DataTable';
import type { Column } from './DataTable';

type Person = { id: number; name: string; age: number; email: string; };

const data: Person[] = [
  { id: 1, name: 'Ada Lovelace', age: 36, email: 'ada@calc.org' },
  { id: 2, name: 'Grace Hopper', age: 85, email: 'grace@navy.mil' },
  { id: 3, name: 'Alan Turing', age: 41, email: 'alan@bletchley.uk' },
];

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: 'Data Display/DataTable',
  component: DataTable<Person>,
  args: { data, columns },
};
export default meta;
type Story = StoryObj<typeof DataTable<Person>>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [] } };
export const SelectableMultiple: Story = { args: { selectable: 'multiple' } };
export const SelectableSingle: Story = { args: { selectable: 'single' } };
