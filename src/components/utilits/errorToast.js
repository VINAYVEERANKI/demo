import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const errorToast = (message ="error") => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export default errorToast