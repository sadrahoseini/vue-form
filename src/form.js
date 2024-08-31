import Errors from './errors';

export default class Form {

    /**
     * Create new instance of Form class
     * @param {Object} fields 
     */
    constructor(fields) {
        // Defailt class properties
        this.__fields = []
        this.errors = new Errors

        // loop and set defailt fields
        if (typeof fields === 'object') {
            for (const [field, value] of Object.entries(fields)) {
                // class default props
                if (['errors', '__fields', 'has', 'get', 'only', 'except', 'add', 'remove'].includes(field)) continue
    
                this.add(field, value)
            }
        } else
            console.warn(`[sadrix-vue-form]: Create new Form with an object passed as constructor parameter.`);
    }

    /**
     * Checking whether the field is present or not
     * @param {String} field 
     * @returns 
     */
    has(field) {
        return this.__fields.includes(field)
    }

    /**
     * Get single field value
     * @param {String} field 
     * @returns 
     */
    get(field) {
        return this.has(field) ? this[field] : null
    }

    /**
     * Add new field to form
     * @param {String} field 
     * @param {Object} value 
     */
    add(field, value = null) {
        if (!this.has(field)) {
            this[field] = value
            this.__fields.push(field)
        }
    }

    /**
     * Remove field from form
     * @param {String} field 
     */
    remove(field) {
        if (this.has(field)) {
            delete this[field]
            this.__fields = this.__fields?.filter(k => k != key)
        }
    }

    /**
     * Get all field values as payload
     * @returns {Object}
     */
    all() {
        let payload = {}
        this.__fields.map(field => { payload[field] = this.get(field) })
        return payload
    }

    /**
     * Get fields list values only when name of fields exists in passed field names as Array or just one passed field as string
     * @param {String|String[]} fields 
     * @returns {Object}
     */
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

    /**
     * Get fields list values except passed field names or just one passed field as string
     * @param {String|String[]} fields 
     * @returns {Object}
     */
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

    /**
     * Check form errors all passed or has errors
     * @returns {Boolean} 
     */
    passed() {
        return this.errors.passed()
    }
}