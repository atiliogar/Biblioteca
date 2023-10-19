import mysqlConnection from 'mysql2/promise'

 const properties = {
 	host: 'localhost',
 	user: 'root',
 	password: '',
 	database: 'atiliogarcia_rest-api',
 };

 export const pool = mysqlConnection.createPool(properties);