import React, { useState, ChangeEvent } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import './Table.css';
import Pagination from './Pagination';

interface TableProps {
    children: (query: string) => React.ReactNode;
    page: number;
    totalPages: number;
    handleNextPage: (page: number) => void;
    handlePrevPage: (page: number) => void;
    handlePageClick: (page: number) => void;
    handleModal: (mode: string) => void;
  }

const Table: React.FC<TableProps> = ({ children, page, totalPages, handleNextPage, handlePrevPage, handlePageClick, handleModal }) => {
    const [query, setQuery] = useState('');

    const Search = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return(
        <div className='section-body'>
            <div>
                <div className="input-group">
                    <input type="text" name="search" id="search" onChange={Search} className="input" required />
                    <label className="label">Search</label>
                </div>

                <button className="square-button" onClick={() => handleModal('add')}>
                    <PlusCircle size={20} color="var(--main-color)" />
                    Add a Task
                </button>
            </div>

            <div className='table-container'>
                <table>
                    { children(query) }
                </table>
            </div>

            <Pagination 
                page={page} 
                totalPages={totalPages} 
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage} 
                handlePageClick={handlePageClick} 
            />
        </div>
    );
}

export default Table;