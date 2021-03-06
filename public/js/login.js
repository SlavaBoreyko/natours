/* eslint-disable */
import axios from 'axios';
// import { showAlert } from './alerts';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            // alert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 100);
        }
    } catch (err) {
        // alert('error', err.response.data.message);
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        })
        if (res.data.status === 'success') {
            setTimeout(() => {
                location.assign('/');
            })
        }; 
    } catch (err) {
        console.log('Error logging out!', err);
    }
 };


// const loginForm = document.querySelector('.form');

// if (loginForm) {
//     loginForm.addEventListener('submit', e => {
//         e.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         login(email, password);
//     });
// }


    