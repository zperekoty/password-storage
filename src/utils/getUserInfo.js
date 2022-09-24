import axios from '../utils/axios';

const getPasswords = async () => {
    try {
        const { data } = await axios.get('/');
    } catch (error) {
        console.log(error);
    }
};

export default getPasswords;