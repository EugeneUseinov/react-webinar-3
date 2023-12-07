import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { utilPagination, DOTS } from "../../store/util-pagination";
import "./style.css";

const Pagination = (props) => {
  const cn = bem('Pagination');
  const { onLoad, siblingCount, totalCount, currentPage, itemsOnPage } = props;
  const paginationRange = utilPagination({
    currentPage,
    itemsOnPage,
    totalCount,
    siblingCount,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  return (
    <div className={cn()}>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <div key = {Math.floor(Math.random() * 100000)} className={cn("item-dots")}>{DOTS}</div>;
        }
        return (
          <div key = {pageNumber}
            className={cn(`item ${
              currentPage == pageNumber ? "active" : ""
            }`)}
            selected={pageNumber === currentPage}
            onClick={() => onLoad(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  siblingCount: PropTypes.number,
  onLoad: PropTypes.func,
  itemsOnPage: PropTypes.number,
};

Pagination.defaultProps = {
  siblingCount: 1,
  onLoad: () => {},
};

export default Pagination;
