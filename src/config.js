// For developement
//const API_BASE_URL = 'http://localhost:3000';

// For production (minikube kubernetes)
//const API_BASE_URL = 'http://task.local/api';

// For AWS using nginx ingress controller
const API_BASE_URL = '/api';

console.log("API URL:", API_BASE_URL);

export { API_BASE_URL };
