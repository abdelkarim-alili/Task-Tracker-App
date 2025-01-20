import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../components/Table";
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { showSuccessToast, showErrorToast } from "../components/Toast";
import Modal from "../components/Modal";
import './Home.css';

interface Task {
    id: number;
    taskName: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [editId, setEditId] = useState(null);
    const [taskFormData, setTaskFormData] = useState({
        taskName: '',
        description: '',
        isCompleted: false,
    });

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setTaskFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5076/api/tasks?page=${currentPage}&pageSize=10`);
            setTasks(response.data.tasks);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [currentPage]);

    const handleNextPage = (nextPage: number) => {
        setCurrentPage(nextPage);
    };

    const handlePrevPage = (prevPage : number) => {
        setCurrentPage(prevPage);
    };

    const handlePageClick = (pageNum : number) => {
        setCurrentPage(pageNum);
    };

    const filterData = (query: string) => {
        return tasks.filter((data: Record<string, any>) => 
            Object.keys(data).some(key => 
                data[key] && data[key].toString().toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleModal = (mode?: string) => {
        setModal(prev => !prev);
        if(mode == 'add'){
            setMode('add');
            setTaskFormData({
                taskName: '',
                description: '',
                isCompleted: false,
            });
        }
    };

    const handleCheckboxChange = async (row: any, event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const data = {
                taskName: row['taskName'],
                description: row['description'],
                isCompleted: event.target.checked,
            };

            const response = await axios.put(`http://localhost:5076/api/tasks/${row['id']}`, data);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === row['id'] ? { ...task, ...response.data.data } : task
                )
            );
            showSuccessToast(response.data.message, 'center');
        } catch (error: any) {
            console.log(error);
            showErrorToast(error.response?.data?.error ?? 'An error occurred while editing the task', 'center');
        }
    };

    const handleAddTaskForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5076/api/tasks`, taskFormData);
            setTasks(prevTasks => [response.data.data, ...prevTasks]);
            showSuccessToast(response.data.message, 'center');
            handleModal('add');
        } catch (error: any) {
            handleModal('add');
            showErrorToast(error.response?.data?.error ?? 'An error occurred while adding the task', 'center');
        }
    }

    const handleEditTaskForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5076/api/tasks/${editId}`, taskFormData);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === editId ? { ...task, ...response.data.data } : task
                )
            );
            showSuccessToast(response.data.message, 'center');
            handleModal();
        } catch (error: any) {
            handleModal();
            showErrorToast(error.response?.data?.error ?? 'An error occurred while editing the task', 'center');
        }
    }

    const handleEdit = (row: any) => {
        handleModal();
        setEditId(row.id);
        setMode('edit');
        setTaskFormData({
            taskName: row.taskName || '',
            description: row.description || '',
            isCompleted: row.isCompleted || false,
        });
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:5076/api/tasks/${id}`);
            showSuccessToast(response.data.message, 'center');
            setTasks((prevData) => prevData.filter((item) => item['id'] !== id));
        } catch (error: any) {
            showErrorToast(error.response?.data?.error ?? 'An error occurred while deleting the task', 'center');
        }
    };

    return(
        <div className="container">
            {
                isLoading?
                <div className="loader-container">
                    <span className="loader-page"></span>
                </div>
                :
                <Table
                    page={currentPage}
                    totalPages={totalPages}
                    handleNextPage= {handleNextPage}
                    handlePrevPage= {handlePrevPage}
                    handlePageClick= {handlePageClick}
                    handleModal={() => handleModal('add')}
                >
                    {(query) => (
                        <>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task Name</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Is Completed</th>
                                    <th>Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData(query).map((data, index) => (
                                    <tr key={index}>
                                        <td>{data['id']}</td>
                                        <td>{data['taskName']}</td>
                                        <td>{data['description']}</td>
                                        <td>{new Date(data['createdAt']).toLocaleString()}</td>
                                        <td>
                                            <div className="checkbox-container">
                                                <input 
                                                    type="checkbox" 
                                                    className="input-checkbox" 
                                                    id={`checkbox-${data['id']}`} 
                                                    checked={data['isCompleted']? true : false} 
                                                    onChange={(event) => handleCheckboxChange(data, event)} 
                                                    style={{ display: 'none' }}
                                                />
                                                <label className="checkbox" htmlFor={`checkbox-${data['id']}`}>
                                                    <span>
                                                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                        <polyline points="1 5 4 8 11 1"></polyline>
                                                    </svg>
                                                    </span>
                                                    <span>Completed</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                className='button-action'
                                                style={{ backgroundColor: '#4361ee' }}
                                                onClick={() => handleEdit(data)}
                                            >
                                                <PencilSquare size={20} color="#fff" />
                                            </button>
                                            <button className='button-action'
                                                style={{ backgroundColor: 'red' }}
                                                onClick={() => handleDelete(data['id'])}
                                            >
                                                <TrashFill size={20} color="#fff" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </Table>
            }

            <Modal title='Add a task' isOpen={modal} closeModal ={handleModal} onSubmit={mode === 'add'? handleAddTaskForm : handleEditTaskForm}>
                <div className='form-row'>
                    <div className="input-group">
                        <input type="text" name="taskName" value={taskFormData.taskName} onChange={handleInputChange} className="input" required />
                        <label className="label">Task Name</label>
                    </div>
                    <div className="input-group">
                        <input type="text" name="description" value={taskFormData.description} onChange={handleInputChange} className="input" required />
                        <label className="label">Description</label>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Home;