class n {
  constructor() {
    this.errors = {};
  }
  has(r) {
    return this.errors ? !!this.errors[r] : !1;
  }
  passed() {
    return Object.keys(this.errors).length === 0 && this.errors.constructor === Object;
  }
  set(r, t = []) {
    if (!t || t.length === 0)
      this.errors = r;
    else
      for (let s in r)
        t.includes(s) && (this.errors[s] = r[s]);
  }
  get(r) {
    return this.has(r) ? typeof this.errors[r] == "string" ? this.errors[r][0] : this.errors[r] : "";
  }
  add(r) {
    let t = new Object();
    t = Object.assign(this.errors, r), this.errors = t, console.log(this.errors);
  }
  clear(r) {
    if (typeof r == "string")
      this.errors[r] = [];
    else if (typeof r == "array")
      r.forEach((t) => {
        this.errors[t] = [];
      });
    else
      return this.errors = {};
  }
}
class o {
  constructor(r) {
    let t = [];
    if (typeof r == "object")
      for (const [s, i] of Object.entries(r))
        ["errors", "__fields"].includes(s) || (this[s] = i, t.push(s));
    else
      console.warn("[sadrix-vue-form]: Create new Form with an object passed as constructor parameter.");
    this.__fields = t, this.errors = new n();
  }
  has(r) {
    return this.__fields.includes(r);
  }
  get(r) {
    return this.has(r) ? this[r] : null;
  }
  all() {
    let r = {};
    return this.__fields.map((t) => {
      r[t] = this.get(t);
    }), r;
  }
  only(r) {
    let t = {};
    return typeof r == "string" ? t[r] = this.has(r) ? this[r] : null : r.map((s) => {
      this.has(s) && (t[s] = this.get(s));
    }), t;
  }
  except(r) {
    let t = {};
    return this.__fields.map((s) => {
      typeof r == "string" && (s !== r ? t[s] = this.get(s) : r.includes(s) || (t[s] = this.get(s)));
    }), t;
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
