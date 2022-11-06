import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (status) => {
    if (status.type == 'success') {
        toast.success(status.message);
    } else if (status.type == 'error') {
        toast.error(status.message);
    } else if (status.type == 'info') {
        toast.error(status.message);
    } else {
        toast(status.message);
    }
}

export const displayAlert = (type, message) => {
    const status = {
        type: type,
        message: message
    };
    return notify(status);
}