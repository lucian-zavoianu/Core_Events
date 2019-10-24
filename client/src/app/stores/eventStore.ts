import { observable } from 'mobx';
import { createContext } from 'react';

class EventStore {
    @observable title = 'Hello from MobX';
}

export default createContext(new EventStore());