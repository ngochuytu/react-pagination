// @ts-nocheck
import React, { useState } from 'react';
import { Pagination } from '../../components';
import './PaginationExample.style.css';

const LoadingSpinner = (props) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

const PaginationExample = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const listData = new Array(dataPerPage).fill(0).map((_, index) => {
    const rowNumber = index + (currentPage - 1) * dataPerPage;
    return (
      <div key={rowNumber}>
        <p>This is row number {rowNumber}</p>
      </div>
    );
  });

  const onPageChange = (activePage) => {
    //Fetch api here
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPage(activePage);
    }, 1000);
  };

  return (
    <div className="pagination-example-container">
      <h1>This is page number {currentPage}</h1>
      {listData}
      <Pagination
        totalPages={100}
        activePage={1}
        breakButtonStep={2}
        pageRange={9}
        onPageChange={onPageChange}
        navigateToFirstPageButtonLabel="&#171;"
        navigateToLastPageButtonLabel="&#187;"
      />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default PaginationExample;
