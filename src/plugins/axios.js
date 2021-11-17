const axios = require('axios');

module.exports = () => {
    return axios.create({
        baseURL: localStorage.getItem('server_url'),
        //timeout: 1000,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('server_api_key')}`,
            'Access-Control-Allow-Origin': '*'
        }
    });
};
