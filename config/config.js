const config = { // Determines the API URL to fetch data from
    base_url: 'https://jsonplaceholder.typicode.com/',
    // Determines the validation config for the data you get from the API
    types: {
        posts: [
            {
                key: 'userId',
                type: 'number'
            }, {
                key: 'id',
                type: 'number'
            }, {
                key: 'title',
                type: 'string'
            }, {
                key: 'body',
                type: 'string'
            }
        ],
        comments: [
            {
                key: 'postId',
                type: 'number'
            }, {
                key: 'id',
                type: 'number'
            }, {
                key: 'name',
                type: 'string'
            }, {
                key: 'email',
                type: 'string'
            }, {
                key: 'body',
                type: 'string'
            }
        ],
        albums: [
            {
                key: 'userId',
                type: 'number'
            }, {
                key: 'id',
                type: 'number'
            }, {
                key: 'title',
                type: 'string'
            }
        ],
        photos: [
            {
                key: 'albumId',
                type: 'number'
            }, {
                key: 'id',
                type: 'number'
            }, {
                key: 'title',
                type: 'string'
            }, {
                key: 'url',
                type: 'string'
            }, {
                key: 'thumbnailUrl',
                type: 'string'
            }
        ],
        todos: [
            {
                key: 'userId',
                type: 'number'
            }, {
                key: 'id',
                type: 'number'
            }, {
                key: 'title',
                type: 'string'
            }, {
                key: 'completed',
                type: 'boolean'
            }
        ],
        users: [
            {
                key: 'id',
                type: 'number'
            }, {
                key: 'name',
                type: 'string'
            }, {
                key: 'username',
                type: 'string'
            }, {
                key: 'email',
                type: 'string'
            }, {
                key: 'address',
                type: 'object'
            }, {
                key: 'phone',
                type: 'string'
            }, {
                key: 'website',
                type: 'string'
            }, {
                key: 'company',
                type: 'object'
            }
        ]
    },
    // Determines the order in which the data is added in order to preserve foreign key relations
    order_of_creation: {
        'users': {
            'posts': {
                'comments': false
            },
            'albums': {
                'photos': false
            },
            'todos': false
        }
    }
}

module.exports = config;
