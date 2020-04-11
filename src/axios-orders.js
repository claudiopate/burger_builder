import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-7d4c8.firebaseio.com/'
});


export default instance;