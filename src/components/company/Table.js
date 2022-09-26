

import React, { useRef, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table as AntTable } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../css/table.css'
import { Pagination } from '../all';

import Highlighter from 'react-highlight-words';

export const Table = (props) => {
  const {data, setVisible, selected, setSelected, setData , CpnyID, setCpnyID} = props;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { t } = useTranslation();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
         
            size="small"
            style={{
              width: 90,
            }}
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            clearFilters && 
            handleReset(clearFilters)
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: t('table.company'), 
      // accessor: 'CpnyID' ,
      dataIndex: 'CpnyID',
      key: 'CpnyID',
      align: 'left',
      ...getColumnSearchProps('CpnyID'),
      
    },
    {
      title: t('table.vendorcode'),
      dataIndex: 'VendID',
      key: 'VendID',
      // width: '20%',
      ...getColumnSearchProps('VendID'),
      // accessor: 'WebUserID'
    },
    {
      title: t('table.vendorname'),
      dataIndex: 'VendName',
      key: 'VendName',
      align: 'center',
      ...getColumnSearchProps('VendName'),
      sorter: (a, b) => a.VendName.length - b.VendName.length,
      sortDirections: ['descend', 'ascend'],
      accessor: 'VendName'
    },
    {
      title: t('user_email'),
      dataIndex: 'VendUserID',
      key: 'VendUserID',
      ...getColumnSearchProps('VendUserID'),
      // sorter: (a, b) => a.Email.length - b.Email.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
      
    },
    {
      title: t('user_password'),
      dataIndex: 'VendPass',
      key: 'VendPass',
      align: 'center',
      ...getColumnSearchProps('VendPass'),
      // sorter: (a, b) => a.Phone.length - b.Phone  .length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },  
    {
      title: t('table.phone'),
      dataIndex: 'Phone',
      key: 'Phone',
      align: 'center',
      ...getColumnSearchProps('Phone'),
      // sorter: (a, b) => a.Phone.length - b.Phone  .length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    }, 
   {
      title: t('login.email'),
      dataIndex: 'Email',
      key: 'Email',
      align: 'center',
      ...getColumnSearchProps('Email'),
      // sorter: (a, b) => a.VendorCount.length - b.VendorCount.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },   
    {
      title:  t('table.bank'),
      dataIndex: 'Bank',
      key: 'Bank',
      align: 'right',

      ...getColumnSearchProps('Bank'),
      // sorter: (a, b) => a.LicenseAmt.length - b.LicenseAmt.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
      
    },
    {
      title: t('table.bankacct'),
      dataIndex: 'BankAcct',
      key: 'BankAcct',
      ...getColumnSearchProps('BankAcct'),
      // sorter: (a, b) => a.WebServiceURL.length - b.WebServiceURL.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    }, 
    {
      title: t('table.address'),
      dataIndex: 'Address',
      key: 'Address',
      ...getColumnSearchProps('Address'),
      // sorter: (a, b) => a.Address.length - b.Address.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },  
    
   
    {
      title: t('table.uselicensedate'),
      dataIndex: 'UseLicenseDate',
      key: 'UseLicenseDate',
      ...getColumnSearchProps('UseLicenseDate'),
      // sorter: (a, b) => a.TxnType.length - b.TxnType.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },  
     {
      title: t('table.licenseExpireDate'),
      dataIndex: 'LicenseExpireDate',
      key: 'LicenseExpireDate',
      align: 'center',
      ...getColumnSearchProps('LicenseExpireDate'),
      // sorter: (a, b) => a.AppServerIP.length - b.AppServerIP.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },
    {
      title: t('Үүсгэсэн огноо'),
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      align: 'center',
      // sortDirections: ['descend'],
      ...getColumnSearchProps('CreatedDate'),
      // sorter: (a, b) => a.CreatedDate.length - b.CreatedDate.length,
      sortDirections: ['descend', 'ascend'],
      accessor: 'CreatedDate'
    },
   
   
  ];

  return <AntTable columns={columns} dataSource={data}
  onRow={(record, rowIndex) => {
    return {
      // onClick: event => {
      //   setVisible(true)
      //   setSelected(rowIndex?.original);
        
      // }, // click row
      onDoubleClick: event => {
        setVisible(true)
        // selected(rowIndex)
        setSelected(record);
        // toggleAllRowsSelected(false);
        // rowIndex?.toggleRowSelected();
        console.log(record)
      }, // double click row
    };
  }}   />;
  <Pagination />
};
