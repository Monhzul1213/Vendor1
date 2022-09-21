import React from 'react';
import { Select } from 'antd';

import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { usePagination, DOTS } from '../../helpers/usePagination';

export function Pagination(props){
  const { tableInstance, id, total, hasTotal } = props;
  const { Option } = Select;
  const { canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize,
    state: { pageIndex, pageSize }} = tableInstance;
  let first = pageIndex * pageSize + 1;
  let last = (((pageIndex + 1) * pageSize) < total) ? ((pageIndex + 1) * pageSize) : total;

  const paginationRange = usePagination({ currentPage: pageIndex + 1, totalPageCount: pageOptions.length, siblingCount: 1, pageSize });
  const pageRange = [50, 100, 150];

  return (
    <div className='pagination_back' id={id}>
      <button className='pagination_btn' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <BsChevronDoubleLeft className={canPreviousPage ? 'pagination_arrow' : 'pagination_arrow_disabled'} />
      </button>
      <button className='pagination_btn' onClick={() => previousPage()} disabled={!canPreviousPage}>
        <BsChevronLeft className={canPreviousPage ? 'pagination_arrow' : 'pagination_arrow_disabled'} />
      </button>
      {paginationRange.map(pageNumber => {
        if(pageNumber === DOTS) return <span  key={pageNumber + ''} className="pagination_dots">. . .</span>;

        let className = pageNumber === pageIndex + 1 ? 'page_current_' : 'page_';
        return (
          <button key={pageNumber + ''} className={className + 'btn'} onClick={() => gotoPage(pageNumber - 1)}>
            <span className={className + 'text'}>{pageNumber}</span>
          </button>
        );
      })}
      <button className='pagination_btn' onClick={() => nextPage()} disabled={!canNextPage}>
        <BsChevronRight className={canNextPage ? 'pagination_arrow' : 'pagination_arrow_disabled'} />
      </button>
      <button className='pagination_btn' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <BsChevronDoubleRight className={canNextPage ? 'pagination_arrow' : 'pagination_arrow_disabled'} />
      </button>
      
      <Select
        className='page_select'
        value={pageSize}
        onSelect={e => setPageSize(Number(e))}>
        {pageRange?.map(item => {
          return (<Option key={item} value={item}>{item}</Option>)
        })}
      </Select>
      {hasTotal ? <p className='page_showing'>{first}-{last} of {total}</p> : null}
    </div>
  )
}