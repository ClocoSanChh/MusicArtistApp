const events = new Map();
export default{
    $on(eventName, fn) {
        events.set(eventName, []);
        events.get(eventName).push(fn);
    },

    $off(eventName, fn) {
        throw{ message: 'Not implemented'};
    },

    $emit(eventName, data){
        if(events.has(eventName)){
            events.get(eventName).forEach(fn => fn(data));
        }
    },
}