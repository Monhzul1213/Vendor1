

import React, { useRef, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table as AntTable, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../css/table.css'
// import { Pagination } from '../all';

import Highlighter from 'react-highlight-words';

export const Table = (props) => {
  const {data, setVisible, selected, setSelected} = props;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
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
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
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
          placeholder={`Search `}
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

const prop = {
    // bordered: true,
    // loading: false,
    // pagination: { position: "bottom" },
    // size: "200px",
    // title: undefined,
    // showHeader: true,
    // rowSelection: {},
    // scroll: { y: 200 }
  };
const columns = [
    {
      title: t('table.company'), 
      // accessor: 'CpnyID' ,
      dataIndex: 'CpnyID',
      key: 'CpnyID',
      ...getColumnSearchProps('CpnyID'),
      
    },
    {
      title: t('table.company_name'), 
      // accessor: 'CpnyID' ,
      dataIndex: 'CpnyName',
      key: 'CpnyName',
      ...getColumnSearchProps('CpnyName'),
      
    },
    {
      title: t('table.vendorcode'),
      dataIndex: 'VendID',
      key: 'VendID',
      align: 'center',
      // width: '20%',
      ...getColumnSearchProps('VendID'),
      // accessor: 'WebUserID'
    },
    {
      title: t('table.vendorname'),
      dataIndex: 'VendName',
      key: 'VendName',
      width: '200px',
      ...getColumnSearchProps('VendName'),
      // sorter: (a, b) => a.VendName.length - b.VendName.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'VendName'
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
      // align: 'center',
      ...getColumnSearchProps('Email'),
      // sorter: (a, b) => a.VendorCount.length - b.VendorCount.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },   
    {
      title:  t('table.bank'),
      dataIndex: 'Bank1',
      key: 'Bank1',
      // align: 'right',

      ...getColumnSearchProps('Bank1'),
      // sorter: (a, b) => a.LicenseAmt.length - b.LicenseAmt.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
      
    },
    {
      title: t('table.bankacct'),
      dataIndex: 'Bank2',
      key: 'Bank2',
      align: 'center',
      ...getColumnSearchProps('Bank2'),
    }, 
    {
      title: t('table.address'),
      dataIndex: 'Address',
      key: 'Address',
      ...getColumnSearchProps('Address'),
      sorter: (a, b) => a.Address.length - b.Address.length,
      sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
    },  
    
   
    {
      title: t('table.uselicensedate'),
      dataIndex: 'UseLicenseDate',
      key: 'UseLicenseDate',
      align: 'center',
      // ...getColumnSearchProps('UseLicenseDate'),
      // sorter: (a, b) => a.TxnType.length - b.TxnType.length,
      // sortDirections: ['descend', 'ascend'],
      // accessor: 'WebPassword'
      filters: [
        {
          text: t('true'),
          value: 'Y',
        },
        {
          text: t('false'),
          value: 'N',
        },
       
      ],
      filteredValue: filteredInfo.UseLicenseDate || null,
      onFilter: (value, record) => record.UseLicenseDate.includes(value),
      ellipsis: true,
    },  
     {
      title: t('table.licenseExpireDate'),
      dataIndex: 'LicenseExpireDate',
      key: 'LicenseExpireDate',
      align: 'center',
      ...getColumnSearchProps('LicenseExpireDate'),

    },
   
  ];

  return <>
  <AntTable {...prop}  columns={columns } dataSource={data}  onChange={handleChange}
    pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['50', '100', '150']}}
    // pagination1={false}
  onRow={(record, rowIndex) => {
    return {
        onDoubleClick: event => {
        setVisible(true)
        setSelected(record);
        console.log(rowIndex )
      }} 
  } }  />
  {/* <Pagination className='pagination'/> */}
  </>
};
