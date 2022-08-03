import { ReactNode } from 'react';
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
/** Render a pagination */
declare const Pagination: (props: PaginationProps) => JSX.Element;
export default Pagination;
