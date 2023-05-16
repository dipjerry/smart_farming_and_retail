import { useTable, usePagination } from 'react-table';

function PaginatedTable({ columns, data }) {

    console.log("data");
    console.log(data);
    // console.log("columns");
    // console.log(columns);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <>
      <table className="table-responsive  w-[100%] h-[227px] border shadow-[0px_1px_3px_rgba(0,0,0,0.25)] rounded-[10px_10px_0px_0px]  bg-[#ffffff]" {...getTableProps()}>
        <thead className="rounded-[10px_10px_0px_0px] bg-[#f7f7f7]">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-wrap justify-between items-center px-4 py-2 border-t border-gray-200 sm:px-6">
  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-l">
    {'<<'}
  </button>
  <button onClick={() => previousPage()} disabled={!canPreviousPage} className="py-2 px-4 bg-gray-200 text-gray-700">
    {'<'}
  </button>
  <button onClick={() => nextPage()} disabled={!canNextPage} className="py-2 px-4 bg-gray-200 text-gray-700">
    {'>'}
  </button>
  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-r">
    {'>>'}
  </button>
  <span className="text-gray-700">
    Page{' '}
    <strong>
      {pageIndex + 1} of {pageOptions.length}
    </strong>{' '}
  </span>
  <span className="text-gray-700">
    | Go to page:{' '}
    <input
      type="number"
      defaultValue={pageIndex + 1}
      onChange={e => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0;
        gotoPage(page);
      }}
      className="w-20 py-1 px-2 text-gray-700 rounded"
    />
  </span>
</div>

    </>
  );
}

export default PaginatedTable;