import React, {useState, useEffect} from 'react'
import style from './balancepage.module.scss';
import { useTable, usePagination } from 'react-table'

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    if (e.target.type == "checkbox") {
      setValue(Boolean(e.target.checked));
    } else {
      setValue(Number(e.target.value));
    }
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  if (typeof initialValue != "boolean") {
    return <input type="number" value={value} onChange={onChange} onBlur={onBlur} />
  } else {
    if (value) {
      return <input type="checkbox" onChange={onChange} onBlur={onBlur} checked/>
    } else {
      return <input type="checkbox" onChange={onChange} onBlur={onBlur} />
    }
  }
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  EditableCell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function SubTable({ 
    columns, 
    data, 
    updateMyData, 
    editable
  }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
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
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{ cell.column.id == 'value' && editable ? cell.render('EditableCell'): cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
 
function SubTableComponent({
  dataRow,
  updateOneBalanceCalculation,
}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Наименование',
        accessor: 'transVar',
      },
      {
        Header: 'Значение',
        accessor: 'value',
      },
    ],
    []
  )
  const [dataInput, setDataInput] = React.useState(() => dataRow.original.calculation_input)
  const [dataOutput, setDataOutput] = React.useState(() => dataRow.original.calculation_output)
  const [dataBalanceData, setDataBalanceData] = React.useState(() => dataRow.original.balance_data)

  useEffect(() => {
    setDataInput(dataRow.original.calculation_input)
    setDataOutput(dataRow.original.calculation_output)
    setDataBalanceData(dataRow.original.balance_data)
  }, [ dataRow]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setDataInput(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    console.log(dataInput)
  }, [dataInput])


  const updateOneBalance = () =>updateOneBalanceCalculation(dataInput, dataRow.original.factoryId, dataRow.original.balancesId, dataRow.original.name)
  return (
    <>
    <button className={style.input} onClick={updateOneBalance}>Отправить данные потока</button>
    <h3>Входные данные</h3>
      <SubTable
        columns={columns}
        data={dataInput}
        updateMyData={updateMyData}
        editable = {true}
      />
      
      <h3>Выходные данные</h3>
      <SubTable
        columns={columns}
        data={dataOutput}
        updateMyData={updateMyData}
        editable = {false}
      />
       <h3>Данные баланса</h3>
       <SubTable
        columns={columns}
        data={dataBalanceData}
        updateMyData={updateMyData}
        editable = {false}
      />
    </>
  )
}

export default SubTableComponent
