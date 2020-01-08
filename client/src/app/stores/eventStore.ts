import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IEvent } from '../models/event';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class EventStore {
    // The observable map provides more functionality than a plain array
    // to store the events
    // @observable events: IEvent[] = [];
    @observable eventRegistry = new Map();
    @observable event: IEvent | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadEvents = async () => {
        this.loadingInitial = true;

        try {
            const events = await agent.Events.list();

            runInAction('Loading Events', () => {
                events.forEach(event => {
                    event.date = event.date.split(".")[0];
                    this.eventRegistry.set(event.id, event);
                });
    
                this.loadingInitial = false
            });
        } catch (error) {
            runInAction('Loade Events Error', () => {
                this.loadingInitial = false
            });

            console.log(error);
        }
    }

    @action loadEvent = async (id: string) => {
        let event = this.getEvent(id);

        if (event) {
            this.event = event;
        } else {
            this.loadingInitial = true;

            try {
                event = await agent.Events.details(id);

                runInAction('Getting Event', () => {
                    this.event = event;
                    this.loadingInitial = false;
                });
            } catch (error) {
                runInAction('Get Event Error', () => {
                    this.loadingInitial = false;
                });

                console.log(error);
            }
        }
    }

    // Helper Method for loadEvent
    getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    }

    @action createEvent = async (event: IEvent) => {
        this.submitting = true;

        try {
            await agent.Events.create(event);

            runInAction('Creating Event', () => {
                this.eventRegistry.set(event.id, event);
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction('Create Event Error', () => {
                this.submitting = false;
            });
            
            console.log(error);
        }
    };

    @action editEvent = async (event: IEvent) => {
        this.submitting = true;

        try {
            await agent.Events.update(event);

            runInAction('Editing Event', () => {
                this.eventRegistry.set(event.id, event);
                this.event = event;
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction('Edit Event Error', () => {
                this.submitting = false;
            });
            
            console.log(error);
        }
    }

    @action deleteEvent = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        
        try {
            await agent.Events.delete(id);

            runInAction('Deleting Event', () => {
                this.eventRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            runInAction('Delete Event Error', () => {
                this.submitting = false;
                this.target = '';
            });
            
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.event = undefined;
    }

    @action openEditForm = (id: string) => {
        this.event = this.eventRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedEvent = () => {
        this.event = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectEvent = (id: string) => {
        this.event = this.eventRegistry.get(id);
        this.editMode = false;
    };
}

export default createContext(new EventStore());