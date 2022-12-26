import Errors from './errors';

export default class Form {

    constructor(fields) {
        let __fields = []
        if (typeof fields === 'object') {
            for (const [key, value] of Object.entries(fields)) {
                // class default props
                if (['errors', '__fields'].includes(key)) continue
    
                this[key] = value
                __fields.push(key)
            }
        } else
            console.warn(`[sadrix-vue-form]: Create new Form with an object passed as constructor parameter.`);
        this.__fields = __fields
        this.errors = new Errors
    }

    has(field) {
        return this.__fields.includes(field)
    }

    get(field) {
        return this.has(field) ? this[field] : null
    }

    all() {
        let payload = {}
        this.__fields.map(field => { payload[field] = this.get(field) })
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

        this.__fields.map(field => {
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