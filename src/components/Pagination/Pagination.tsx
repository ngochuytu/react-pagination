/* eslint-disable prefer-const */
import React, { useState, useCallback, useEffect, useRef, useMemo, ReactNode } from 'react';
import './style.css';

export interface PaginationProps {
  /** (Required) The total number of pages */
  totalPages: number;
  /** (Optional) The initial active page. The default value is 1. This value is uncontrolled, activePage then will be controlled by component's state */
  activePage?: number;
  /** (Optional) (Min: 5) Range of pages displayed, exclude 2 navigation button to first and last page. The default value is 7 */
  pageRange?: number;
  /** (Optional) Step of break button. The default value is 1 */
  breakButtonStep?: number;
  /**(Optional) Disable 2 navigation buttons. The default value is false*/
  disableNavigationButtons?: boolean;
  /**(Optional) Disable initial onPageChange call. The default value is true. You might have to turn off {@link https://reactjs.org/docs/strict-mode.html Strict mode} in development mode*/
  disableInitialOnPageChangeCall?: boolean;
  /** (Optional) ClassName of container */
  containerClassName?: string;
  /** (Optional) ClassName of each page button */
  pageButtonClassName?: string;
  /** (Optional) ClassName of active page button */
  activePageButtonClassName?: string;
  /** (Optional) ClassName of navigate to first page button */
  navigateToFirstPageButtonClassName?: string;
  /** (Optional) ClassName of navigate to last page button */
  navigateToLastPageButtonClassName?: string;
  /** (Optional) ClassName of break button */
  breakButtonClassName?: string;
  /**(Optional) Label for the navigate to first page button. The default value is "<<" */
  navigateToFirstPageButtonLabel?: ReactNode;
  /**(Optional) Label for the navigate to last page button. The default value is ">>" */
  navigateToLastPageButtonLabel?: ReactNode;
  /**(Optional) Label for the break button. The default value is "..." */
  breakButtonLabel?: ReactNode;
  /**(Optional) Page change handler, receive activePage as an argument */
  onPageChange?: (activePage: number) => any;
}

const DEFAULT_PROPS = {
  totalPages: 1,
  activePage: 1,
  pageRange: 7,
  breakButtonStep: 1,
  disableNavigationButtons: false,
  disableInitialOnPageChangeCall: false,
  containerClassName: 'pagination-container',
  pageButtonClassName: 'pagination-button',
  activePageButtonClassName: 'pagination-button pagination-button-active',
  navigateToFirstPageButtonClassName: 'pagination-button',
  navigateToLastPageButtonClassName: 'pagination-button',
  breakButtonClassName: 'pagination-button',
  navigateToFirstPageButtonLabel: '<<',
  navigateToLastPageButtonLabel: '>>',
  breakButtonLabel: '...',
};

/** Render a pagination */
const Pagination = (props: PaginationProps) => {
  let {
    totalPages,
    activePage,
    pageRange,
    breakButtonStep,
    disableNavigationButtons,
    disableInitialOnPageChangeCall,
    containerClassName,
    pageButtonClassName,
    activePageButtonClassName,
    navigateToFirstPageButtonClassName,
    navigateToLastPageButtonClassName,
    breakButtonClassName,
    navigateToFirstPageButtonLabel,
    navigateToLastPageButtonLabel,
    breakButtonLabel,
    onPageChange,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  totalPages = useMemo(() => Math.round(Math.abs(totalPages)), [totalPages]);
  activePage = useMemo(() => Math.round(Math.abs(activePage)), [activePage]);
  pageRange = useMemo(() => Math.round(Math.abs(pageRange)), [pageRange]);
  breakButtonStep = useMemo(() => Math.round(Math.abs(breakButtonStep)), [breakButtonStep]);

  const [currentPage, setCurrentPage] = useState<number>(activePage);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (disableInitialOnPageChangeCall) {
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
      } else {
        if (onPageChange) onPageChange(currentPage);
      }
    } else {
      if (onPageChange) onPageChange(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const generatePaginationButton = useCallback(
    (key: string | number, label: ReactNode, className: string, onClick: () => any): JSX.Element => {
      return (
        <div key={key} className={className} onClick={onClick}>
          {label}
        </div>
      );
    },
    [],
  );

  const navigateToFirstPageButton = useMemo(
    () =>
      generatePaginationButton('jump-first', navigateToFirstPageButtonLabel, navigateToFirstPageButtonClassName, () =>
        setCurrentPage(1),
      ),
    [navigateToFirstPageButtonClassName, generatePaginationButton, navigateToFirstPageButtonLabel],
  );
  const navigateToLastPageButton = useMemo(
    () =>
      generatePaginationButton('jump-last', navigateToLastPageButtonLabel, navigateToLastPageButtonClassName, () =>
        setCurrentPage(totalPages),
      ),
    [navigateToLastPageButtonClassName, generatePaginationButton, navigateToLastPageButtonLabel, totalPages],
  );
  const firstPageButton = useMemo(
    () => generatePaginationButton('first-page', 1, pageButtonClassName, () => setCurrentPage(1)),
    [pageButtonClassName, generatePaginationButton],
  );
  const lastPageButton = useMemo(
    () => generatePaginationButton('last-page', totalPages, pageButtonClassName, () => setCurrentPage(totalPages)),
    [pageButtonClassName, generatePaginationButton, totalPages],
  );
  const previousBreakButton = useMemo(
    () =>
      generatePaginationButton('previous-break', breakButtonLabel, breakButtonClassName, () =>
        setCurrentPage((currentPage) => (currentPage - breakButtonStep <= 1 ? 1 : currentPage - breakButtonStep)),
      ),
    [breakButtonLabel, breakButtonStep, breakButtonClassName, generatePaginationButton],
  );
  const nextBreakButton = useMemo(
    () =>
      generatePaginationButton('next-break', breakButtonLabel, breakButtonClassName, () =>
        setCurrentPage((currentPage) =>
          currentPage + breakButtonStep >= totalPages ? totalPages : currentPage + breakButtonStep,
        ),
      ),
    [breakButtonLabel, breakButtonStep, breakButtonClassName, generatePaginationButton, totalPages],
  );
  const pageNumberButton = useCallback(
    (pageNumber: number): JSX.Element => {
      if (pageNumber === currentPage)
        return generatePaginationButton(pageNumber, pageNumber, activePageButtonClassName, () =>
          setCurrentPage(pageNumber),
        );

      return generatePaginationButton(pageNumber, pageNumber, pageButtonClassName, () => setCurrentPage(pageNumber));
    },
    [activePageButtonClassName, pageButtonClassName, currentPage, generatePaginationButton],
  );

  const renderPagination = useCallback((): Array<JSX.Element> => {
    const pagination: Array<JSX.Element> = [];

    //3 Stages:
    //First: 2 last buttons is break button and totalPages
    //Middle: 2 first button is break button, firstPage and 2 last buttons is break button, totalPages
    //Last: 2 first buttons is break button and totalPages

    const firstStageRemainingButtons = pageRange - 2;
    const middleStageRemainingButtons = pageRange - 4;
    const lastStageRemainingButtons = pageRange - 2;

    if (totalPages <= pageRange) {
      for (let i = 1; i <= totalPages; ++i) {
        pagination.push(pageNumberButton(i));
      }
    } else {
      //First Stage
      //If currentPage is not the last buttons (exclude 2 last buttons)
      if (currentPage < firstStageRemainingButtons) {
        for (let i = 1; i <= firstStageRemainingButtons && i <= totalPages; ++i) {
          pagination.push(pageNumberButton(i));
        }

        pagination.push(nextBreakButton);
        pagination.push(lastPageButton);
      }
      //Last Stage
      //Counting from the end so the first button index is totalPages - lastStageRemainingButtons, plus 1 so that the current button start from the second position, not the first position and not able to navigate backwards
      else if (currentPage > totalPages - lastStageRemainingButtons + 1) {
        pagination.push(firstPageButton);
        pagination.push(previousBreakButton);

        for (let i = totalPages - lastStageRemainingButtons + 1; i <= totalPages; i++) {
          pagination.push(pageNumberButton(i));
        }
      }
      //Middle stage
      else {
        const start =
          middleStageRemainingButtons % 2 === 0
            ? currentPage - middleStageRemainingButtons / 2 + 1
            : currentPage - Math.floor(middleStageRemainingButtons / 2);
        const end = currentPage + Math.floor(middleStageRemainingButtons / 2);

        pagination.push(firstPageButton);
        pagination.push(previousBreakButton);

        for (let i = start; i <= end; i++) {
          pagination.push(pageNumberButton(i));
        }

        pagination.push(nextBreakButton);
        pagination.push(lastPageButton);
      }
    }

    if (disableNavigationButtons) return pagination;
    else return [navigateToFirstPageButton, ...pagination, navigateToLastPageButton];
  }, [
    pageRange,
    totalPages,
    disableNavigationButtons,
    navigateToFirstPageButton,
    navigateToLastPageButton,
    pageNumberButton,
    currentPage,
    nextBreakButton,
    lastPageButton,
    firstPageButton,
    previousBreakButton,
  ]);

  return <div className={containerClassName}>{renderPagination()}</div>;
};

export default Pagination;
