import React, { useMemo, useState } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean | 'single' | 'multiple';
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  getRowKey?: (row: T, index: number) => React.Key;
  className?: string;
}

type SortState<T> = { key: string; dataIndex: keyof T; direction: 'asc' | 'desc' } | null;

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data',
  getRowKey,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(new Set());
  const rowKey = (row: T, i: number) => (getRowKey ? getRowKey(row, i) : (i as React.Key));

  const sorted = useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;
    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => {
      const av = a[col.dataIndex];
      const bv = b[col.dataIndex];
      if (av == null && bv == null) return 0;
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [data, columns, sort]);

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, dataIndex: col.dataIndex, direction: 'asc' };
      if (prev.direction === 'asc') return { ...prev, direction: 'desc' };
      return null;
    });
  };

  const toggleSelect = (key: React.Key) => {
    if (!selectable) return;
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (selectable === 'single') {
        next.clear();
        next.add(key);
      } else {
        next.has(key) ? next.delete(key) : next.add(key);
      }
      return next;
    });
  };

  const allSelected = selectable && sorted.length > 0 && selectedKeys.size === sorted.length;
  const someSelected = selectable && selectedKeys.size > 0 && selectedKeys.size < sorted.length;

  React.useEffect(() => {
    if (!onRowSelect) return;
    const selectedRows: T[] = [];
    sorted.forEach((row, i) => {
      const key = rowKey(row, i);
      if (selectedKeys.has(key)) selectedRows.push(row);
    });
    onRowSelect(selectedRows);
  }, [selectedKeys, sorted, onRowSelect]);

  return (
    <div className={['overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-md', className].filter(Boolean).join(' ')}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable ? (
              <th scope="col" className="px-3 py-2 w-10">
                {selectable !== 'single' && (
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={!!allSelected}
                    ref={(el) => { if (el) el.indeterminate = !!someSelected; }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const keys = new Set<React.Key>();
                        sorted.forEach((row, i) => keys.add(rowKey(row, i)));
                        setSelectedKeys(keys);
                      } else {
                        setSelectedKeys(new Set());
                      }
                    }}
                  />
                )}
              </th>
            ) : null}
            {columns.map((col) => {
              const isSorted = sort?.key === col.key;
              const ariaSort = isSorted ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : 'none';
              return (
                <th
                  key={col.key}
                  scope="col"
                  role="columnheader"
                  aria-sort={ariaSort as React.AriaAttributes['aria-sort']}
                  className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 select-none"
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(col)}
                    disabled={!col.sortable}
                    className="inline-flex items-center gap-1"
                    aria-label={col.sortable ? `Sort by ${col.title}` : undefined}
                  >
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden="true" className="text-gray-400">
                        {isSorted ? (sort!.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-3 py-6 text-center text-sm text-gray-500">
                Loading...
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-3 py-6 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => {
              const key = rowKey(row, i);
              const isSelected = selectable ? selectedKeys.has(key) : false;
              return (
                <tr key={key} className={isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : undefined}>
                  {selectable ? (
                    <td className="px-3 py-2">
                      <input
                        type={selectable === 'single' ? 'radio' : 'checkbox'}
                        name="row-select"
                        aria-label="Select row"
                        checked={isSelected}
                        onChange={() => toggleSelect(key)}
                      />
                    </td>
                  ) : null}
                  {columns.map((col) => {
                    const cell = (row as any)[col.dataIndex];
                    return (
                      <td key={col.key} className="px-3 py-2 text-sm text-gray-800 dark:text-gray-100">
                        {col.render ? col.render(cell, row) : String(cell ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
