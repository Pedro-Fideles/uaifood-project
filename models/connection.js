const mysql = require('mysql2/promise');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'p.Fideles321',
	database: 'uaifood'
});

module.exports = connection;
