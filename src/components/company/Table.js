

import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table as AntTable } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDimensions } from '../../helpers/useDimensions'
import moment from 'moment'
import '../../css/table.css'
import Highlighter from 'react-highlight-words';

export const Table = (props) => {
  const {data, setVisible,  setSelected} = props;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { height } = useDimensions();
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          className='ant_search'
          ref={searchInput}
          placeholder={t('search')}
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
            {t('search')}
          </Button>
          <Button
            type="primary"
            size="small"
            style={{
              width: 90,
            }}
            onClick={() => {
              clearFilters && handleReset(clearFilters)
              confirm({
                closeDropdown: false,
              });
              // setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex );
            }}
          >
            {t('filtered')}
          </Button>
          <Button
            type="link"
            size="small"
            handleClick={() => {
              close();
            }}
          >
            {t('close')}
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


const columns = [
    {
      title: t('table.company'), 
      dataIndex: 'CpnyID',
      key: 'CpnyID',
      ...getColumnSearchProps('CpnyID'),
      width: 110
    },
    {
      title: t('table.company_name'), 
      dataIndex: 'CpnyName',
      key: 'CpnyName',
      ...getColumnSearchProps('CpnyName'),
      width: 120
    },
    {
      title: t('table.vendorcode'),
      dataIndex: 'VendID',
      key: 'VendID',
      align: 'center',
      ...getColumnSearchProps('VendID'),
      width: 150
    },
    {
      title: t('table.vendorname'),
      dataIndex: 'VendName',
      key: 'VendName',
      ...getColumnSearchProps('VendName'),
      width: 150,
    },
    {
      title: t('user_email'),
      dataIndex: 'VendUserID',
      key: 'VendUserID',
      ...getColumnSearchProps('VendUserID'),
      width: 210
    },
    {
      title: t('user_password'),
      dataIndex: 'VendPass',
      key: 'VendPass',
      ...getColumnSearchProps('VendPass'),
      width: 140
    },  
    {
      title: t('table.phone'),
      dataIndex: 'Phone',
      key: 'Phone',
      align: 'center',
      ...getColumnSearchProps('Phone'),
      width: 130
    }, 
   {
      title: t('login.email'),
      dataIndex: 'Email',
      key: 'Email',
      width: 210,
      ...getColumnSearchProps('Email'),
    },   
    {
      title:  t('table.bank'),
      dataIndex: 'Bank1',
      key: 'Bank1',
      ...getColumnSearchProps('Bank1'),
      width: 130
      
    },
    {
      title: t('table.bankacct'),
      dataIndex: 'Bank2',
      key: 'Bank2',
      align: 'center',
      ...getColumnSearchProps('Bank2'),
      width: 130,
    }, 
    {
      title: t('table.address'),
      dataIndex: 'Address',
      width: 180,
      key: 'Address',
      ...getColumnSearchProps('Address')
    },  
    
   
    {
      title: t('table.uselicensedate'),
      dataIndex: 'UseLicenseDate',
      key: 'UseLicenseDate',
      width: 150,
      align: 'center',
    },  
     {
      title: t('table.licenseExpireDate'),
      dataIndex: 'LicenseExpireDate',
      key: 'LicenseExpireDate',
      align: 'center',
      ...getColumnSearchProps('LicenseExpireDate'),
      width: 100,
    },
    {
      title: ('Үүсгэсэн огноо'),
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      align: 'center',
      sorter: {
        compare: (a, b) =>
          moment(a.CreatedDate, "yyyy.MM.DD, HH:mm:ss") - moment(b.CreatedDate, "yyyy.MM.DD, HH:mm:ss"),
      },
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      width: 120
    },
   
  ]; 

  return (
    <AntTable columns={columns } dataSource={data}
    pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['50', '100', '150']}}  
    scroll={{ x: 'max-content', y: height - 260 , scrollToFirstRowOnChange: false }}
    onRow={(record) => {
    return {
        onDoubleClick: event => {
        setVisible(true)
        setSelected(record);
      }} 
    }} 
   />
  )
};
