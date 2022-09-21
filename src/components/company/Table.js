import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {collection, doc, getDocs} from 'firebase/firestore'
import {db} from '../../firebase'
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import { formatNumber } from '../../helpers/formatNumber';
import '../../css/table.css';
import { Pagination, Sort } from '../all';

export function Table(props){
  
  const { data, setVisible, selected, setSelected, setData } = props;
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    setColumns([
      { Header: <div style={{textAlign:'center',}}> {t('table.company')}</div>, accessor: 'CpnyID', },
      { Header: <div style={{textAlign:'center'}}> { t('table.vendorcode')}</div> , accessor: 'VendID', Cell: props => <div style={{textAlign: 'center'}}>{(props.value)}</div>   }, 
      { Header: <div style={{textAlign:'center'}}> { t('table.vendorname')}</div> , accessor: 'VendName',  },
      { Header: <div style={{textAlign:'center'}}> {t('user_email')}</div> , accessor: 'VendUserID', },
      { Header: <div style={{textAlign:'center',}}> {t('user_password')}</div> , accessor: 'VendPass', },
      { Header: <div style={{textAlign: 'center'}}>{ t('table.phone')}</div>, accessor: 'Phone' , Cell: props => <div style={{textAlign: 'center', paddingRight: 15}}>{(props.value)}</div>  },
      { Header: <div style={{ textAlign:'center'}}>{ t('login.email')}</div>, accessor: 'Email' , },
       { Header: <div style={{ textAlign:'center'}}>{ t('table.bank')}</div>, accessor: 'Bank' ,Cell: props => <div style={{ paddingRight: 15}}>{(props.value)}</div> },
      { Header:<div style={{ textAlign:'center'}}>{ t('table.bankacct')}</div>, accessor: 'BankAcct' , Cell: props => <div style={{textAlign: 'center', paddingRight: 15}}>{(props.value)}</div> },
      { Header: <div style={{textAlign:'center'}}>{ t('table.address')}</div> , accessor: 'Address' , Cell: props => <div style={{width: '200px'}}>{(props.value)}</div> },
      { Header:<div style={{textAlign:'center'}}>{ t('table.uselicensedate')}</div>, accessor: 'UseLicenseDate', Cell: props => <div style={{textAlign: 'center'}}>{(props.value)}</div>},      
      { Header: <div style={{textAlign:'center'}}>{ t('table.licenseExpireDate')}</div> , accessor: 'LicenseExpireDate' , Cell: props => <div style={{textAlign: 'center' , paddingRight: 10}}>{(props.value)}</div>},
      { Header: <div style={{textAlign:'center'}}>{ t('Үүсгэсэн огноо')}</div> , accessor: 'CreatedDate' , Cell: props => <div style={{textAlign: 'center' , paddingRight: 10}}>{(props.value)}</div>},
      
     
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
  const tableInstance = useTable( { columns, data, initialState: { pageIndex: 0, pageSize: 100, sortBy: [{ id: 'CreatedDate', desc: true }]  }}, useSortBy, usePagination, useRowSelect);
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
              let style = row?.original?.HexColor ? {backgroundColor: row?.original?.HexColor, borderColor: '#fff'} : {};
              return (
                <>
                <tr className={row?.isSelected ? 'table_row_selected' : 'table_row'} {...row.getRowProps()} style={style} onClick={() => onClick(row)} onDoubleClick={() => onRowClick(row)}>
                  {row.cells.map(cell => {
                    return <td className='table_cell_text' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                 {/* {row?.original?.Address ? <tr className={row?.isSelected ? 'table_row_selected' : ''} colSpan={13} style={style} onClick={() => onClick(row)} onDoubleClick={() => onRowClick(row)}><td colSpan={13}>
                 <p className='table_descr'>{t('table.address')}:     {row?.original?.Address}  </p>
               </td></tr> : null} */}
               </>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination tableInstance={tableInstance} hasTotal={true} total={data?.length}  />
    </div>
  )
}