import React, { useMemo,useState } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import MOCK_DATA2 from './MOCK_DATA2.json';
import { COLUMNS } from './columns';
import { COLUMNS2 } from './columns2';

import styled from './table.module.scss';

const BasicTable = () => {

	const columns2 = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Avatar',
            accessor: 'avatar',
          },
          {
            Header: 'Full Name',
            accessor: 'full_name',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Telephone',
            accessor: 'tel',
          },
          {
            Header: 'Role',
            accessor: 'role',
          },
        ],
      },
    ],
    []
  )
	const arr=
	[
	{email: 'anton.kirienko.2000@mail.ru', avatar: null, tel: '123', full_name: null, role: 'ADMIN'},
	{email: 'keka@mail.ru', avatar: null, tel: '12345', full_name: null, role: 'EMPLOYEE'},
	{email: 'portos@mail.ru', avatar: null, tel: '123456', full_name: null, role: 'EMPLOYEE'},
	]
	const [modalActive, setModalActive] = useState(true);
	function switchtable() {
    if (modalActive === false) {

      setModalActive(true);
    } else setModalActive(false);
  }


  const data = useMemo(() => modalActive?MOCK_DATA:MOCK_DATA2, [modalActive]);
	const columns=useMemo(() =>modalActive?COLUMNS:COLUMNS2, [modalActive]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );


  function params(id) {
    if (id === 'avatar' ||id==='image') {
      return 1;
    } else return 0;
  }



  return (
    <>
      <div className={styled.container}>
        <div className={styled.tableWrap}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps({
                        className: column.collapse ? 'collapse' : '',
                      })}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps({
                            className: cell.column.collapse ? 'collapse' : '',
                          })}
                        >
                          {params(cell.column.id) ? (
                            <img
                              width={150}
                              height={150}
                              src={cell.value}
                              alt="фото"
                            ></img>
                          ) : (
                            cell.render('Cell')
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <div {...getTableBodyProps()}></div>
          </table>
          {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        </div>
				<div className={styled.footertable}>
				<div className={styled.pagination}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
				<div className={styled.switchtable}>
					<button className={styled.switchtable__button} onClick={()=>switchtable()}>{modalActive?"Показать всех пользователей":"Показать список сведения баланса"}</button>
				</div>
				</div>
        
      </div>
    </>
  );
};
export default BasicTable;
