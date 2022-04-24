import React, {useState, useEffect} from 'react'

import style from './table.module.scss';
import { useTable, useExpanded } from 'react-table'
import { balanceCalculationCompany, fetchAllbalanceCalculationCompany, fetchOnebalanceCalculationCompany, getSortBalance, updateOneBalanceCalculationCompany } from '../../http/balanceAPI';

import makeData from './makeData'
import SubTableComponent from './SubTableComponent'

const BalanceTable = ({balances, factory, startDate, endDate}) => {
    const [selectRow, setSelectRow] = useState([]);
    const getRowProps = row => ({
        style: {
          'border-left':  selectRow == row  ? '5px solid rgb(24, 191, 110)' : '5px solid rgb(0, 0, 0, 0)',
        },
        onClick: () => !row.canExpand  ? setSelectRow(selectRow == row ? {} : row) : null,
      })
    const columns = React.useMemo(
      () => [
        {
         
          id: 'expander', // Make sure it has an ID
       
          Cell: ({ row }) =>
          
            row.canExpand ? (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    // We can even use the row.depth property
                    // and paddingLeft to indicate the depth
                    // of the row
                    paddingLeft: `${row.depth * 1}rem`,
                  },
                })}
              >
                {row.isExpanded ? '∨' : '>'}
              </span>
            ) : null,
        },
        {
          Header: 'Дата баланса',
          accessor: 'createdAt',
        },
        {
          Header: 'Nазвание потока',
          accessor: 'name',
        },
        {
          Header: 'Значение',
          accessor: 'value',
        },
        {
          Header: 'Рассчитано',
          accessor: 'calculations',
        },
      ],
      []
    )

    const [data, setData] = useState([])
 
    useEffect(() => {
      setData(makeData(balances))
    }, [ balances]);
    console.log(data);
    useEffect(() => {
      setSelectRow([])
    }, [ data]);

    const updateOneBalanceCalculation = async (calculation_input, factoryId, balancesId, name) => {
      calculation_input.forEach((element) => {
        balances.find(x => x.id === balancesId).calculation_input.BalanceInputVariables.find(x => x.name === name)[element.name] = Number(element.value);
      });
      await updateOneBalanceCalculationCompany(balances.find(x => x.id === balancesId))
      getSortBalance(factory, startDate, endDate).then(data => (
        setData(makeData(data))
        ));
      }
    
      const renderRowSubComponent = React.useCallback(
        ( row ) => (
           <SubTableComponent
            dataRow={row}
            updateOneBalanceCalculation={updateOneBalanceCalculation}
           />
        ),
      );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { 
          expanded,
        },
      } = useTable(
        {
          columns,
          data,
        },
        useExpanded // Use the useExpanded plugin hook
      )
      // Render the UI for your table
      return (
        <>
            <div className={style.left_panel}>
                <table bgcolor="#ffffff" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        { ...row.canExpand 
                            ?  <tr { ...row.getToggleRowExpandedProps() }>
                                {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                            :  <tr {...row.getRowProps(getRowProps(row))}>
                                {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        }
                    )
                    })}
                </tbody>
                </table>
                <pre>
                { Object.keys(selectRow).length 
                    ? renderRowSubComponent(selectRow)
                    : null
                }
                </pre>
            </div>
        </>
      )
};
export default BalanceTable;
