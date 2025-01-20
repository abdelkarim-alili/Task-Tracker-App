import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const showSuccessToast = (message: string, position: 'left' | 'center' | 'right') => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: position,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
};

const showErrorToast = (message: string, position: 'left' | 'center' | 'right') => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: position,
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
    }).showToast();
};

export {showSuccessToast, showErrorToast};