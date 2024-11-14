import { ApiConfig } from "../config/api.config";

export default function api(path, method, body){
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: path,
            baseURL: ApiConfig.API_URL,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        })
        .then(res => responseHandler(res, resolve, reject))
        .catch(err => reject(err))
    });
}

function getToken() {
    const token = localStorage.getItem('api_token')
    return 'Barer ' + token;
}

function responseHandler(res, resolve, reject) {
    if(res.status < 200 || res.status >= 300) {
        return reject(res.data)
    }

    if(res.data.statusCode < 0) {
        return reject(res.data)
    }

    resolve(res.data)
}

export function saveToken(token) {
    localStorage.setItem('api_token', token)
}