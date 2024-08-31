class h {
  constructor() {
    this.__errors = {};
  }
  /**
   * Check whether field has error or not
   * @param {String} field 
   * @returns 
   */
  has(r) {
    return this.__errors && this.__errors.hasOwnProperty(r) ? !!(this.__errors[r] && this.__errors[r].length > 0) : !1;
  }
  /**
   * Get field error message
   * @param {String} field 
   * @returns 
   */
  get(r) {
    if (this.has(r))
      return typeof this.__errors[r] == "string" ? this.__errors[r] : this.__errors[r][0];
  }
  /**
   * Check form errors all passed or has errors
   * @returns {Boolean} 
   */
  passed() {
    return Object.keys(this.__errors).length === 0 && this.__errors.constructor === Object;
  }
  /**
   * Set new form errors. All errors set before will remove and new field errors will set
   * @param {Object} errors 
   * @param {String[]} fields 
   */
  set(r, s = []) {
    if (!s || s.length === 0)
      this.__errors = r;
    else
      for (let t in r)
        s.includes(t) && (this.__errors[t] = r[t]);
  }
  /**
   * Add new field errors. This method will not remove of errors
   * @param {Object} errors 
   */
  add(r) {
    let s = new Object();
    s = Object.assign(this.__errors, r), this.__errors = s, console.log(this.__errors);
  }
  /**
   * Clear passed field or fields list. If not passing fields value, witll clear all errors
   * @param {?String|?String[]} fields 
   * @returns 
   */
  clear(r = null) {
    if (typeof r == "string")
      this.has(r) && delete this.__errors[r];
    else if (typeof r == "array")
      r.forEach((s) => {
        this.has(s) && delete this.__errors[s];
      });
    else
      return this.__errors = {};
  }
}
class o {
  /**
   * Create new instance of Form class
   * @param {Object} fields 
   */
  constructor(r) {
    if (this.__fields = [], this.errors = new h(), typeof r == "object")
      for (const [s, t] of Object.entries(r))
        ["errors", "__fields", "has", "get", "only", "except", "add", "remove"].includes(s) || this.add(s, t);
    else
      console.warn("[sadrix-vue-form]: Create new Form with an object passed as constructor parameter.");
  }
  /**
   * Checking whether the field is present or not
   * @param {String} field 
   * @returns 
   */
  has(r) {
    return this.__fields.includes(r);
  }
  /**
   * Get single field value
   * @param {String} field 
   * @returns 
   */
  get(r) {
    return this.has(r) ? this[r] : null;
  }
  /**
   * Add new field to form
   * @param {String} field 
   * @param {Object} value 
   */
  add(r, s = null) {
    this.has(r) || (this[r] = s, this.__fields.push(r));
  }
  /**
   * Remove field from form
   * @param {String} field 
   */
  remove(r) {
    var s;
    this.has(r) && (delete this[r], this.__fields = (s = this.__fields) == null ? void 0 : s.filter((t) => t != key));
  }
  /**
   * Get all field values as payload
   * @returns {Object}
   */
  all() {
    let r = {};
    return this.__fields.map((s) => {
      r[s] = this.get(s);
    }), r;
  }
  /**
   * Get fields list values only when name of fields exists in passed field names as Array or just one passed field as string
   * @param {String|String[]} fields 
   * @returns {Object}
   */
  only(r) {
    let s = {};
    return typeof r == "string" ? s[r] = this.has(r) ? this[r] : null : r.map((t) => {
      this.has(t) && (s[t] = this.get(t));
    }), s;
  }
  /**
   * Get fields list values except passed field names or just one passed field as string
   * @param {String|String[]} fields 
   * @returns {Object}
   */
  except(r) {
    let s = {};
    return this.__fields.map((t) => {
      typeof r == "string" && (t !== r ? s[t] = this.get(t) : r.includes(t) || (s[t] = this.get(t)));
    }), s;
  }
}
const i = {
  install(e, r = "Form") {
    try {
      r = r || "Form", e.config.globalProperties[`$${r}`] = o, window[r] = o;
    } catch {
      console.warn("[Sadrix-Vue-Fomr]: propName is invalid: " + r);
    }
  }
};
export {
  i as default
};
