// Internal libraries
const config = require('../config/config');

let validator_helper = {};

// Helper functions to dynamically generate validation functions
const validateSkeleton = (values, allowedKeys) => {

    if (!values || !Array.isArray(values)) 
        return {success: false, message: 'Values passed to validate are not an array'};
    


    for (let elem of values) {
        if (elem && typeof(elem) !== 'object') 
            return {success: false, message: `Certain items in values are not objects, namely - ${elem}, ${
                    typeof(elem)
                }`};
        


        for (let key in elem) {
            if (!keyPresentInAllowedkeys(allowedKeys, key, elem[key])) 
                return {success: false, message: `Certain items in values have invalid keys, namely - ${key}`};
            

        }
    }

    return {success: true, message: null};

}

const keyPresentInAllowedkeys = (allowedKeys, key, value) => {
    for (let each of allowedKeys) {
        if (each.key === key && typeof(value) === each.type) {
            return true;
        }
    }
    return false;
}

// Dynamically generate validation functions
if (config && config.types && typeof(config.types) == 'object' && Object.keys(config.types)) {
    for (let api_key in config.types) {
        validator_helper[`validate_${api_key}`] = (values) => validateSkeleton(values, config.types[api_key]);
    }
} else {
    console.log('Invalid config supplied. Please check your config.');
}

module.exports = validator_helper;
