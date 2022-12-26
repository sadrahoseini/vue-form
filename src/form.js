import Errors from './errors';

export default class Form {

    #__fields = []

    constructor(fields) {
        for (const [key, value] of Object.entries(fields)) {
            // class default props
            if (['errors', '__fields'].includes(key)) continue

            this[key] = value
            this.#__fields.push(key)
        }
        this.errors = new Errors
    }

    has(field) {
        return this.#__fields.includes(field)
    }

    get(field) {
        return this.has(field) ? this[field] : null
    }

    all() {
        let payload = {}
        this.#__fields.map(field => { payload[field] = this.get(field) })
        return payload
    }

    only(fields) {
        let payload = {}

        if (typeof fields === 'string')
            payload[fields] = this.has(fields) ? this[fields] : null
        else
            fields.map(field => {
                if (this.has(field))
                    payload[field] = this.get(field)
            })

        return payload
    }

    except(fields) {
        let payload = {}

        this.#__fields.map(field => {
            if (typeof fields === 'string')
                if (field !== fields)
                    payload[field] = this.get(field)
            else
                if (!fields.includes(field))
                    payload[field]  = this.get(field)
        })
        
        return payload
    }
}