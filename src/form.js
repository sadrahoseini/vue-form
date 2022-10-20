import Errors from './errors';

export default class Form {

    constructor(fields) {
        for (const [key, value] of Object.entries(fields)) {
            this[key] = value;
        }
        this.errors = new Errors;
    }

    has(field) {
        return this.hasOwnProperty(field);
    }
}