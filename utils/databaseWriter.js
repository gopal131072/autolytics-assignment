// Internal libraries
const db = require('../config/db');
const config = require('../config/config');

let databaseWriter_helper = {};

// Helper to dynamically generate functions
const databaseWriteSkeleton = async (path, values) => {
    try {
        let insert_string = '',
            values_string = '',
            count = 1,
            data = [];
        // Generate both the dynamic query
        for (let key in values) {
            insert_string += key.toLowerCase() != key ? `"${key}",` : `${key},`;
            values_string += '$' + count + ',';
            data.push(values[key]);
            count++;
        }
        // Removing trailing commas
        insert_string = insert_string.replace(/(,$)/g, "");
        values_string = values_string.replace(/(,$)/g, "");

        let predicate = 'INSERT INTO ' + path + '(' + insert_string + ')' + ' VALUES ' + '(' + values_string + ')';
        return db.any(predicate, data);
    } catch (err) {
        throw(err);
    }
}

// Dynamically generate all fetchers
if (config && config.types && typeof(config.types) == 'object' && Object.keys(config.types)) {
    for (let key in config.types) {
        databaseWriter_helper[`databaseWrite_${key}`] = (values) => databaseWriteSkeleton(key, values);
    }
} else {
    console.log('Invalid config supplied. Please check your config.');
}

databaseWriter_helper.disconnect = async () => {
    await db.$pool.end();
    console.log('Disconnecting from database');
}

module.exports = databaseWriter_helper;
