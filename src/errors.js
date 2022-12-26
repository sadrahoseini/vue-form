export default class Errors {

    constructor() {
        this.errors = {}
    }

    has(field) {
        return this.errors ? (this.errors[field] ? true : false) : false
    }

    passed() {
        return Object.keys(this.errors).length === 0 && this.errors.constructor === Object
    }

    set(errors, fields = []) {
        if (!fields || fields.length === 0)
            this.errors = errors
        else
            for (let field in errors)
                if (fields.includes(field))
                    this.errors[field] = errors[field]
    }

    get(field) {
        return this.has(field) ? (typeof this.errors[field] == 'array' ? this.errors[field][0] : this.errors[field]) : ''
    }

    add(errors) {
        let new_errors = new Object();
        new_errors = Object.assign(this.errors, errors)
        this.errors = new_errors
        console.log(this.errors)
    }

    clear(fields) {
        if(typeof fields == 'string') {
            this.errors[fields] = []
        } else if (typeof fields == 'array') {
            fields.forEach((field) => {
                this.errors[field] = []
            })
        }
        else
            return this.errors = {}
    }
}