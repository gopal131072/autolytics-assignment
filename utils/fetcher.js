// External libraries
const axios = require('axios');

// Internal libraries
const config = require('../config/config');

let fetcher_helper = {};

// Helper to dynamically generate functions
const fetcherSkeleton = async (path) => {
    try {
        let response = await axios.get(config.base_url + path);
        if (response.status === 200) 
            return {success: true, data: response.data};
         else 
            return {
                success: false,
                message: 'Non 200 response code ' + response.status,
                data: []
            };
        

    } catch (err) {
        throw(err);
    }
}

// Dynamically generate all fetchers
if (config && config.types && typeof(config.types) == 'object' && Object.keys(config.types)) {
    for (let key in config.types) {
        fetcher_helper[`fetch_${key}`] = () => fetcherSkeleton(key);
    }
} else {
    console.log('Invalid config supplied. Please check your config.');
}

module.exports = fetcher_helper;
