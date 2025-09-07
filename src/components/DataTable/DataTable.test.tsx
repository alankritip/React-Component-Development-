import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable} from './DataTable';
import type { Column } from './DataTable';

type Row = { id: number; name: string; age: number };
const rows: Row[] = [
  { id: 1, name: 'B', age: 30 },
  { id: 2, name: 'A', age: 20 },
];
const cols: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

test('toggles sort and updates aria-sort', () => {
  render(<DataTable data={rows} columns={cols} />);
  const header = screen.getByRole('columnheader', { name: /name/i });
  expect(header).toHaveAttribute('aria-sort', 'none');
  fireEvent.click(screen.getByRole('button', { name: /sort by name/i }));
  expect(header).toHaveAttribute('aria-sort', 'ascending');
  fireEvent.click(screen.getByRole('button', { name: /sort by name/i }));
  expect(header).toHaveAttribute('aria-sort', 'descending');
});

test('selects rows and fires callback', () => {
  const handle = vi.fn();
  render(<DataTable data={rows} columns={cols} selectable="multiple" onRowSelect={handle} />);
  const checks = screen.getAllByRole('checkbox');
  fireEvent.click(checks[2]);
  expect(handle).toHaveBeenCalled();
});
