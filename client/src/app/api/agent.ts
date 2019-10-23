import axios, { AxiosResponse } from 'axios';
import { IEvent } from '../models/event';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) =>
    (response: AxiosResponse) =>
        new Promise<AxiosResponse>(
            resolve =>
                setTimeout(() =>
                    resolve(response), ms
                )
        );

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Events = {
    list: (): Promise<IEvent[]> => requests.get('/events'),
    details: (id: string) => requests.get(`/events/${id}`),
    create: (event: IEvent) => requests.post('/events', event),
    update: (event: IEvent) => requests.put(`/events/${event.id}`, event),
    delete: (id: string) => requests.delete(`/events/${id}`)
}

export default {
    Events
}