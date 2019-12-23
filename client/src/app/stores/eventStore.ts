import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IEvent } from '../models/event';
import agent from '../api/agent';

class EventStore {
    @observable events: IEvent[] = [];
    @observable selectedEvent: IEvent | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;

    @action loadEvents = async () => {
        this.loadingInitial = true;

        try {
            const events = await agent.Events.list();
            events.forEach(event => {
                event.date = event.date.split(".")[0];
                this.events.push(event);
            });

            this.loadingInitial = false
        } catch (error) {
            console.log(error);
            this.loadingInitial = false
        }
    }

    @action createEvent = async (event: IEvent) => {
        this.submitting = true;

        try {
            await agent.Events.create(event);
            this.events.push(event);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedEvent = undefined;
    }

    @action selectEvent = (id: string) => {
        this.selectedEvent = this.events.find(e => e.id === id);
        this.editMode = false;
    };
}

export default createContext(new EventStore());