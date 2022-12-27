class i {
  constructor() {
    this.errors = {};
  }
  has(r) {
    return this.errors && this.errors.hasOwnProperty(r) ? !!(this.errors[r] && this.errors[r].length > 0) : !1;
  }
  passed() {
    return Object.keys(this.errors).length === 0 && this.errors.constructor === Object;
  }
  set(r, s = []) {
    if (!s || s.length === 0)
      this.errors = r;
    else
      for (let t in r)
        s.includes(t) && (this.errors[t] = r[t]);
  }
  get(r) {
    if (this.has(r))
      return typeof this.errors[r] == "string" ? this.errors[r] : this.errors[r][0];
  }
  add(r) {
    let s = new Object();
    s = Object.assign(this.errors, r), this.errors = s, console.log(this.errors);
  }
  clear(r) {
    if (typeof r == "string")
      this.errors[r] = [];
    else if (typeof r == "array")
      r.forEach((s) => {
        this.errors[s] = [];
      });
    else
      return this.errors = {};
  }
}
class o {
  constructor(r) {
    let s = [];
    if (typeof r == "object")
      for (const [t, n] of Object.entries(r))
        ["errors", "__fields"].includes(t) || (this[t] = n, s.push(t));
    else
      console.warn("[sadrix-vue-form]: Create new Form with an object passed as constructor parameter.");
    this.__fields = s, this.errors = new i();
  }
  has(r) {
    return this.__fields.includes(r);
  }
  get(r) {
    return this.has(r) ? this[r] : null;
  }
  all() {
    let r = {};
    return this.__fields.map((s) => {
      r[s] = this.get(s);
    }), r;
  }
  only(r) {
    let s = {};
    return typeof r == "string" ? s[r] = this.has(r) ? this[r] : null : r.map((t) => {
      this.has(t) && (s[t] = this.get(t));
    }), s;
  }
  except(r) {
    let s = {};
    return this.__fields.map((t) => {
      typeof r == "string" && (t !== r ? s[t] = this.get(t) : r.includes(t) || (s[t] = this.get(t)));
    }), s;
  }
}
const h = {
  install(e, r = "Form") {
    try {
      r = r || "Form", e.config.globalProperties[`$${r}`] = o, window[r] = o;
    } catch {
      console.warn("[Sadrix-Vue-Fomr]: propName is invalid: " + r);
    }
  }
};
export {
  h as default
};
