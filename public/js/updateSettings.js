/* eslint-disable */
import axios from "axios";
import { showAlerts } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        const url = 
            type === 'password'
                ? '/api/v1/users/updateMyPassword'
                : '/api/v1/users/updateMe';


        const res = await axios({
            method: 'PATCH',
            url,
            data
        });
        if (res.data.status === 'success') {
            alert(`${type.toUpperCase()} updated successfully!`);
            setTimeout(() => {
                window.location.reload();
            });
        }
    } catch(err) { 
        alert(err.response.data.message);
    }
};