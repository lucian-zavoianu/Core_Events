import axios, { AxiosResponse } from 'axios';
import { IEvent } from '../models/event';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Events = {
    list: () => requests.get('/events'),
    details: (id: string) => requests.get(`/events/${id}`),
    create: (event: IEvent) => requests.post('/events', event),
    update: (event: IEvent) => requests.put(`/events/${event.id}`, event),
    delete: (id: string) => requests.delete(`/events/${id}`)
}

export default {
    Events
}