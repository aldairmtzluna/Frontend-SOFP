import axios from 'axios';

const API_URL = 'http://localhost:8000/api/mongo';

export const updateMongoConnection = (dbConfig) => {
    return axios.post(`${API_URL}/update/`, dbConfig);
};

export const getCollectionNames = () => {
    return axios.get(`${API_URL}/collections/`);
};

export const getCollectionData = (collectionName) => {
    return axios.post(`${API_URL}/collection/data/`, { collection_name: collectionName });
};

export const getCollectionColumns = (collectionName) => {
    return axios.post(`${API_URL}/collection/columns/`, { collection_name: collectionName });
};

export const obfuscateCollectionData = (collectionName, columns) => {
    return axios.post(`${API_URL}/collection/obfuscate/`, { collection_name: collectionName, columns });
};

export const deobfuscateCollectionData = (collectionName, columns) => {
    return axios.post(`${API_URL}/collection/deobfuscate/`, { collection_name: collectionName, columns });
};
