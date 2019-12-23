import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { IEvent } from '../models/event';
import agent from '../api/agent';

class EventStore {
    // The observable map provides more functionality than a plain array
    // to store the events
    @observable eventRegistry = new Map();
    // @observable events: IEvent[] = [];
    @observable selectedEvent: IEvent | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;

    @computed get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadEvents = async () => {
        this.loadingInitial = true;

        try {
            const events = await agent.Events.list();
            events.forEach(event => {
                event.date = event.date.split(".")[0];
                this.eventRegistry.set(event.id, event);
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
            this.eventRegistry.set(event.id, event);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    };

    @action editEvent = async (event: IEvent) => {
        this.submitting = true;

        try {
            await agent.Events.update(event);
            this.eventRegistry.set(event.id, event);
            this.selectedEvent = event;
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedEvent = undefined;
    }

    @action openEditForm = (id: string) => {
        this.selectedEvent = this.eventRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedEvent = () => {
        this.selectedEvent = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectEvent = (id: string) => {
        this.selectedEvent = this.eventRegistry.get(id);
        this.editMode = false;
    };
}

export default createContext(new EventStore());