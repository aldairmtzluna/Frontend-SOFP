import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const connectToDatabase = (databasePath) => {
    return axios.post(`${API_URL}/connect_sqlite/`, { database_path: databasePath });
};

export const getColumns = (databasePath, tableName) => {
    return axios.post(`${API_URL}/get_columns/`, { database_path: databasePath, table_name: tableName });
};

export const obfuscateData = (databasePath, tableName, columns) => {
    return axios.post(`${API_URL}/obfuscate/`, { database_path: databasePath, table_name: tableName, columns });
};

export const deobfuscateData = (databasePath, tableName, columns, key) => {
    return axios.post(`${API_URL}/deobfuscate/`, { database_path: databasePath, table_name: tableName, columns, key });
};
