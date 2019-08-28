// External Libraries
require('dotenv').config({ path: './.env' })

// Internal Libraries
const fetcher = require('./utils/fetcher');
const validator = require('./utils/validator');
const databaseWriter = require('./utils/databaseWriter');

const fetchAndInsertData = async (key) => {
    try {
        console.log('-----------------------------------------------------');
        console.log('Fetching data for', key);

        if (! fetcher[`fetch_${key}`]) {
            console.log('Dynamic function generation for fetchers failed. Please check your config.');
            return;
        }

        // Uses the dynamically generated fetcher functions to fetch the data
        let response = await fetcher[`fetch_${key}`]();

        if (! response.success) {
            console.log('Sorry unable to fetch', key);
            console.log(response.message);
            return;
        }
        console.log('-----------------------------------------------------');
        console.log('Validating data for', key);

        // Uses the dynamically generated validation functions to validate the data
        if (! validator[`validate_${key}`]) {
            console.log('Dynamic function generation for validators failed. Please check your config.');
            return;
        }

        let data_validity = validator[`validate_${key}`](response.data);
        if (! data_validity.success) {
            console.log('Invalid data received from API');
            console.log(data_validity.message);
            return;
        }

        console.log('-----------------------------------------------------');
        console.log('Inserting data in DB for', key);
        let promises = [];
        let batch = 0;
        for (let data of response.data) {
            promises.push(databaseWriter[`databaseWrite_${key}`](data));
            if(promises.length >= 20) {
                await Promise.all(promises);
                promises = [];
            }
        }

        console.log('-----------------------------------------------------');
        console.log('Successfully imported all data from the API for', key);

    } catch (err) {
        console.log(err);
        return;
    }
}

(controller = async () => {
    try {
        // Promises are made in the order of dependency tree, this can be configurized if given more time.
        // Making a recursive configuration for a dependency tree sounds like a fun weekend project any way.
        await fetchAndInsertData('users');
        let promises = [];
        promises.push((async () => {
            await fetchAndInsertData('posts');
            await fetchAndInsertData('comments');
        })());
        promises.push((async () => {
            await fetchAndInsertData('albums');
            await fetchAndInsertData('photos');
        })());
        promises.push((async () => {
            await fetchAndInsertData('todos');
        })());
        await Promise.all(promises);
        console.log('-----------------------------------------------------');
        await databaseWriter.disconnect();
        console.log('-----------------------------------------------------');
    } catch (err) {
        console.log(err);
    }
})();