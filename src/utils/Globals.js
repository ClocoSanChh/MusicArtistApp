const values = new Map();

export default{
    set(valueName, data){
        values.set(valueName, data);
    },

    get(valueName){
        return values.get(valueName);
    },

    delete(valueName){
        values.delete(valueName);
    }
}