export default class Errors {

    constructor() {
        this.__errors = {}
    }

    /**
     * Check whether field has error or not
     * @param {String} field 
     * @returns 
     */
    has(field) {
        return this.__errors && this.__errors.hasOwnProperty(field) ? (this.__errors[field] && this.__errors[field].length > 0 ? true : false) : false
    }

    /**
     * Get field error message
     * @param {String} field 
     * @returns 
     */
    get(field) {
        if (this.has(field))
            return (typeof this.__errors[field] === 'string') ? this.__errors[field] : this.__errors[field][0]
        else
            return
    }

    /**
     * Check form errors all passed or has errors
     * @returns {Boolean} 
     */
    passed() {
        return Object.keys(this.__errors).length === 0 && this.__errors.constructor === Object
    }

    /**
     * Set new form errors. All errors set before will remove and new field errors will set
     * @param {Object} errors 
     * @param {String[]} fields 
     */
    set(errors, fields = []) {
        if (!fields || fields.length === 0)
            this.__errors = errors
        else
            for (let field in errors)
                if (fields.includes(field))
                    this.__errors[field] = errors[field]
    }

    /**
     * Add new field errors. This method will not remove of errors
     * @param {Object} errors 
     */
    add(errors) {
        let new_errors = new Object();
        new_errors = Object.assign(this.__errors, errors)
        this.__errors = new_errors
        console.log(this.__errors)
    }

    /**
     * Clear passed field or fields list. If not passing fields value, witll clear all errors
     * @param {?String|?String[]} fields 
     * @returns 
     */
    clear(fields = null) {
        if(typeof fields == 'string') {
            if (this.has(fields)) {
                delete this.__errors[fields]
            }
        } else if (typeof fields == 'array') {
            fields.forEach((field) => {
                if (this.has(field)) {
                    delete this.__errors[field]
                }
            })
        }
        else
            return this.__errors = {}
    }
}