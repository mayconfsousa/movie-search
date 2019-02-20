import React from 'react';

import { range, isEmpty } from 'lodash';

const MAX_NUM_PAGES = 6;

/**
 * Pagination component
 */
const Pagination = ({ info, onPaginate }) => {
  const { page, total_pages } = info;

  if (isEmpty(info)) return <div />;

  const blockOfPagination = Math.floor((page - 1) / MAX_NUM_PAGES);
  const startPage = blockOfPagination * MAX_NUM_PAGES + 1;
  const endPage = total_pages <= MAX_NUM_PAGES ? total_pages : startPage + MAX_NUM_PAGES - 1;

  const pages = range(startPage, endPage + 1);

  const prevActive = page > 1;
  const prevClick = prevActive ? () => onPaginate(page - 1) : undefined;

  const nextActive = endPage < total_pages;
  const nextClick = nextActive ? () => onPaginate(endPage + 1) : undefined;

  return (
    <div className="col s12 center-align">
      <ul className="pagination">
        <li className={prevActive ? 'waves-effect' : 'disabled'}>
          <a href="#!" onClick={prevClick}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {pages.map(p => (
          <li key={p} className={p === page ? 'active' : 'waves-effect'}>
            <a href="#!" onClick={p !== page ? () => onPaginate(p) : undefined}>
              {p}
            </a>
          </li>
        ))}
        <li className={nextActive ? 'waves-effect' : 'disabled'}>
          <a href="#!" onClick={nextClick}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
