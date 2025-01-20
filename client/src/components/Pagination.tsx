import React, { useEffect, useState } from 'react';
import './Pagination.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

interface PaginationProps {
    page: number;
    totalPages: number;
    handleNextPage: (page: number) => void;
    handlePrevPage: (page: number) => void;
    handlePageClick: (page: number) => void;
  }

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, handleNextPage, handlePrevPage, handlePageClick }) => {
    const [displayStart, setDisplayStart] = useState(1);

    useEffect(() => {
        const calculateDisplayStart = () => {
            const currentPageGroup = Math.ceil(page / 5);
            setDisplayStart((currentPageGroup - 1) * 5 + 1);
        };
        calculateDisplayStart();
    }, [page]);

    const renderPagination = () => {
        const pages = [];

        const screenWidth = window.screen.width;
        var displayPages = 15;
        if (screenWidth <= 600) {
            displayPages = 3;
        } else if (screenWidth > 600 && screenWidth <= 960) {
            displayPages = 5;
        } else {
            displayPages = 5;
        }

        let startPage = displayStart;
        let endPage = Math.min(startPage + displayPages - 1, totalPages);

        if (startPage > 1) {
            pages.push(
                <li key="previous-ellipsis" className="page-item">
                    <span className="page-link" onClick={() => setDisplayStart(Math.max(1, startPage - displayPages))} role="button">
                        ...
                    </span>
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
                    <span className="page-link" onClick={() => handlePageClick(i)} role="button">
                        {i}
                    </span>
                </li>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <li key="next-ellipsis" className="page-item">
                    <span className="page-link" onClick={() => setDisplayStart(Math.min(totalPages - displayPages + 1, startPage + displayPages))} role="button">
                        ...
                    </span>
                </li>
            );
        }

        return pages;
    };

    return (
        <nav className="pagination">
            <ul className="pagination">
                <li className='page-item icons'>
                    <span className="page-link" onClick={page === 1 ? undefined : () => handlePrevPage(page - 1)}>
                        <ChevronLeft size={20} color="#000" />
                    </span>
                </li>
                {renderPagination()}
                <li className={`page-item icons ${page === totalPages ? 'disabled' : ''}`}>
                    <span className="page-link" onClick={page === totalPages ? undefined : () => handleNextPage(page + 1)}>
                        <ChevronRight size={20} color="#000" />
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;