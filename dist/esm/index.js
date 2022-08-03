import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".pagination-container {\r\n  display: flex;\r\n  width: max-content;\r\n}\r\n\r\n.pagination-button {\r\n  background-color: #fff;\r\n  color: #000;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 30px;\r\n  min-width: 30px;\r\n  padding: 0 2px;\r\n  border: 1px solid #000;\r\n  outline: none;\r\n  margin-right: -1px;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.pagination-button:hover,\r\n.pagination-button-active {\r\n  background-color: #000;\r\n  color: #fff;\r\n}\r\n\r\n.pagination-button-active {\r\n  text-decoration: underline;\r\n}\r\n";
styleInject(css_248z);

var DEFAULT_PROPS = {
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
var Pagination = function (props) {
    var _a = __assign(__assign({}, DEFAULT_PROPS), props), totalPages = _a.totalPages, activePage = _a.activePage, pageRange = _a.pageRange, breakButtonStep = _a.breakButtonStep, disableNavigationButtons = _a.disableNavigationButtons, disableInitialOnPageChangeCall = _a.disableInitialOnPageChangeCall, containerClassName = _a.containerClassName, pageButtonClassName = _a.pageButtonClassName, activePageButtonClassName = _a.activePageButtonClassName, navigateToFirstPageButtonClassName = _a.navigateToFirstPageButtonClassName, navigateToLastPageButtonClassName = _a.navigateToLastPageButtonClassName, breakButtonClassName = _a.breakButtonClassName, navigateToFirstPageButtonLabel = _a.navigateToFirstPageButtonLabel, navigateToLastPageButtonLabel = _a.navigateToLastPageButtonLabel, breakButtonLabel = _a.breakButtonLabel, onPageChange = _a.onPageChange;
    totalPages = useMemo(function () { return Math.round(Math.abs(totalPages)); }, [totalPages]);
    activePage = useMemo(function () { return Math.round(Math.abs(activePage)); }, [activePage]);
    pageRange = useMemo(function () { return Math.round(Math.abs(pageRange)); }, [pageRange]);
    breakButtonStep = useMemo(function () { return Math.round(Math.abs(breakButtonStep)); }, [breakButtonStep]);
    var _b = useState(activePage), currentPage = _b[0], setCurrentPage = _b[1];
    var firstRenderRef = useRef(true);
    useEffect(function () {
        if (disableInitialOnPageChangeCall) {
            if (firstRenderRef.current) {
                firstRenderRef.current = false;
            }
            else {
                if (onPageChange)
                    onPageChange(currentPage);
            }
        }
        else {
            if (onPageChange)
                onPageChange(currentPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    var generatePaginationButton = useCallback(function (key, label, className, onClick) {
        return (React.createElement("div", { key: key, className: className, onClick: onClick }, label));
    }, []);
    var navigateToFirstPageButton = useMemo(function () {
        return generatePaginationButton('jump-first', navigateToFirstPageButtonLabel, navigateToFirstPageButtonClassName, function () {
            return setCurrentPage(1);
        });
    }, [navigateToFirstPageButtonClassName, generatePaginationButton, navigateToFirstPageButtonLabel]);
    var navigateToLastPageButton = useMemo(function () {
        return generatePaginationButton('jump-last', navigateToLastPageButtonLabel, navigateToLastPageButtonClassName, function () {
            return setCurrentPage(totalPages);
        });
    }, [navigateToLastPageButtonClassName, generatePaginationButton, navigateToLastPageButtonLabel, totalPages]);
    var firstPageButton = useMemo(function () { return generatePaginationButton('first-page', 1, pageButtonClassName, function () { return setCurrentPage(1); }); }, [pageButtonClassName, generatePaginationButton]);
    var lastPageButton = useMemo(function () { return generatePaginationButton('last-page', totalPages, pageButtonClassName, function () { return setCurrentPage(totalPages); }); }, [pageButtonClassName, generatePaginationButton, totalPages]);
    var previousBreakButton = useMemo(function () {
        return generatePaginationButton('previous-break', breakButtonLabel, breakButtonClassName, function () {
            return setCurrentPage(function (currentPage) { return (currentPage - breakButtonStep <= 1 ? 1 : currentPage - breakButtonStep); });
        });
    }, [breakButtonLabel, breakButtonStep, breakButtonClassName, generatePaginationButton]);
    var nextBreakButton = useMemo(function () {
        return generatePaginationButton('next-break', breakButtonLabel, breakButtonClassName, function () {
            return setCurrentPage(function (currentPage) {
                return currentPage + breakButtonStep >= totalPages ? totalPages : currentPage + breakButtonStep;
            });
        });
    }, [breakButtonLabel, breakButtonStep, breakButtonClassName, generatePaginationButton, totalPages]);
    var pageNumberButton = useCallback(function (pageNumber) {
        if (pageNumber === currentPage)
            return generatePaginationButton(pageNumber, pageNumber, activePageButtonClassName, function () {
                return setCurrentPage(pageNumber);
            });
        return generatePaginationButton(pageNumber, pageNumber, pageButtonClassName, function () { return setCurrentPage(pageNumber); });
    }, [activePageButtonClassName, pageButtonClassName, currentPage, generatePaginationButton]);
    var renderPagination = useCallback(function () {
        var pagination = [];
        //3 Stages:
        //First: 2 last buttons is break button and totalPages
        //Middle: 2 first button is break button, firstPage and 2 last buttons is break button, totalPages
        //Last: 2 first buttons is break button and totalPages
        var firstStageRemainingButtons = pageRange - 2;
        var middleStageRemainingButtons = pageRange - 4;
        var lastStageRemainingButtons = pageRange - 2;
        if (totalPages <= pageRange) {
            for (var i = 1; i <= totalPages; ++i) {
                pagination.push(pageNumberButton(i));
            }
        }
        else {
            //First Stage
            //If currentPage is not the last buttons (exclude 2 last buttons)
            if (currentPage < firstStageRemainingButtons) {
                for (var i = 1; i <= firstStageRemainingButtons && i <= totalPages; ++i) {
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
                for (var i = totalPages - lastStageRemainingButtons + 1; i <= totalPages; i++) {
                    pagination.push(pageNumberButton(i));
                }
            }
            //Middle stage
            else {
                var start = middleStageRemainingButtons % 2 === 0
                    ? currentPage - middleStageRemainingButtons / 2 + 1
                    : currentPage - Math.floor(middleStageRemainingButtons / 2);
                var end = currentPage + Math.floor(middleStageRemainingButtons / 2);
                pagination.push(firstPageButton);
                pagination.push(previousBreakButton);
                for (var i = start; i <= end; i++) {
                    pagination.push(pageNumberButton(i));
                }
                pagination.push(nextBreakButton);
                pagination.push(lastPageButton);
            }
        }
        if (disableNavigationButtons)
            return pagination;
        else
            return __spreadArray(__spreadArray([navigateToFirstPageButton], pagination, true), [navigateToLastPageButton], false);
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
    return React.createElement("div", { className: containerClassName }, renderPagination());
};

export { Pagination };
