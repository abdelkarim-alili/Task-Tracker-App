import React from 'react';
import './Modal.css';

interface ModalProps {
    title: string;
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, closeModal, children, onSubmit }) => {
    return(
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-overlay"></div>
            <div className="modal-container">
                <form className="form" onSubmit={onSubmit}>
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <div className="close-icon" onClick={closeModal}>&times;</div>
                    </div>

                    <div className="modal-content">
                        {children}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="button-close" onClick={closeModal}>Close</button>
                        <button type="submit" className="button-save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;