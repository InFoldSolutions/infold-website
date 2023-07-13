import EventEmitter from 'events';

// Currently used for Client Components
// They will not share the same instance (Server/Client)

const events: EventEmitter = new EventEmitter();

export default events;