import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const ActiveProjectsTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Technology',
        accessor: 'technology',
      },
      {
        Header: 'Company',
        accessor: 'company',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageIndex,
    pageSize,
    gotoPage,
    pageCount,
    state: { sortBy },
    setPageSize
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ cursor: 'pointer', border: '1px solid black' }}>
                  {column.render('Header')}
                  <span>{sortBy.length > 0 && (sortBy[0].id === column.id ? (sortBy[0].desc ? ' 🔽' : ' 🔼') : '')}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => gotoPage(pageIndex - 1)} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ActiveProjectsTable;
