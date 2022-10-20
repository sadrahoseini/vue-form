export default class Errors {

    constructor() {
        this.errors = {};
    }

    has(field) {
        return this.errors ? this.errors[field] : false;
    }

    passed() {
        return Object.keys(this.errors).length === 0 && this.errors.constructor === Object;
    }

    set(errors) {
        this.errors = errors;
    }

    get(field) {
        return this.has(field) ? this.errors[field][0] : '';
    }

    add(errors) {
        let new_errors = new Object();
        new_errors = Object.assign(this.errors, errors);
        this.errors = new_errors;
        console.log(this.errors);
    }

    clear(fields) {
        if(typeof fields == 'string') {
            this.errors[fields] = [];
        } else if (typeof fields == 'array') {
            fields.forEach((field) => {
                this.errors[field] = [];
            });
        }
        else
            return this.errors = {};
    }
}