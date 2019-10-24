import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IEvent } from '../models/event';
import agent from '../api/agent';

class EventStore {
    @observable events: IEvent[] = [];
    @observable loadingInitial = false;

    @action loadEvents = () => {
        this.loadingInitial = true;

        agent.Events.list()
            .then(events => {
                events.forEach(event => {
                    event.date = event.date.split(".")[0];
                    this.events.push(event);
                });
            })
            .finally(() => this.loadingInitial = false);
    }
}

export default createContext(new EventStore());