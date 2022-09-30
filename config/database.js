const path = require('path');
const bookshelf = require('bookshelf');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connector: bookshelf,
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
