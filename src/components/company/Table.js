import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {collection, doc, getDocs} from 'firebase/firestore'
import {db} from '../../firebase'
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';

import '../../css/table.css';
import { Pagination, Sort } from '../all';

export function Table(props){
  // const[user, setUser]= useState([])
  
  const { data, setVisible, selected, setSelected, setData } = props;
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    setColumns([
      { Header: t('table.company'), accessor: 'CpnyID', },
      { Header: t('login.email'), accessor: 'VendUserID', },
      { Header: t('table.vendor'), accessor: 'VendID',  },     
      { Header:<div style={{textAlign:'right', width: '60px'}}>{ t('table.uselicensedate')}</div>, accessor: 'UseLicenseDate',},      
      { Header: <div style={{textAlign:'right', width: '6 0px'}}>{ t('table.licenseExpireDate')}</div> , accessor: 'LicenseExpireDate' },
      { Header: <div style={{ width: '80px'}}>{ t('table.phone')}</div>, accessor: 'Phone' , },
      { Header: <div style={{ width: '50px'}}>{ t('login.email')}</div>, accessor: 'Email' , },
      { Header: <div style={{ width: '50px'}}>{ t('table.bank')}</div>, accessor: 'Bank' , },
      { Header: t('table.bankacct'), accessor: 'BankAcct' , },
    ])
    return () => {};
  }, [i18n?.language])

  useEffect(() => {
    if(!selected){
      toggleAllRowsSelected(false);
    }
    return () => {};
  }, [selected]);

  const onRowClick = row => {
    toggleAllRowsSelected(false);
    row?.toggleRowSelected();
    setVisible(true);
    setSelected(row?.original);
  }
  const onClick = row =>{
    toggleAllRowsSelected(false);
    row?.toggleRowSelected();
  }
  const tableInstance = useTable( { columns, data, initialState: { pageIndex: 0, pageSize: 100 }}, useSortBy, usePagination, useRowSelect);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, toggleAllRowsSelected } = tableInstance;

  return (
    <div className='page_back'>
      <div className='table_container'>
        <table className='table_back' {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.    getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th className='table_header_text' {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className='table_header_cell'>
                      <span style={{flex: 1}}>{column.render('Header')}</span>
                      <Sort data={column} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='table_body_back' {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              let style = row?.original?.HexColor ? {backgroundColor: row?.original?.HexColor} : {};
              return (
                <>
                <tr className={row?.isSelected ? 'table_row_selected' : 'table_row'} {...row.getRowProps()} style={style} onClick={() => onClick(row)} onDoubleClick={() => onRowClick(row)}>
                  {row.cells.map(cell => {
                    return <td className='table_cell_text' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                 {row?.original?.Address ? <tr className={row?.isSelected ? 'table_row_selected' : ''} colSpan={13} style={style} ><td colSpan={13}>
                 <p className='table_descr'>{t('table.address')}:     {row?.original?.Address}  </p>
               </td></tr> : null}
               </>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination tableInstance={tableInstance} />
    </div>
  )
}