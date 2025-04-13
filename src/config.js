// For developement
//const API_BASE_URL = 'http://localhost:3000';

// For production (minikube kubernetes)
//const API_BASE_URL = 'http://task.local/api';

// For AWS 
const API_BASE_URL = 'http://task-manager-api:3000'

console.log("API URL:", API_BASE_URL);

export { API_BASE_URL };
