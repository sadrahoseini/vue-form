var a = (e, r, t) => {
  if (!r.has(e))
    throw TypeError("Cannot " + t);
};
var h = (e, r, t) => (a(e, r, "read from private field"), t ? t.call(e) : r.get(e)), i = (e, r, t) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, t);
};
class c {
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
    return this.has(r) ? typeof this.errors[r] == "array" ? this.errors[r][0] : this.errors[r] : "";
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
var o;
class n {
  constructor(r) {
    i(this, o, []);
    for (const [t, s] of Object.entries(r))
      ["errors", "__fields"].includes(t) || (this[t] = s, h(this, o).push(t));
    this.errors = new c();
  }
  has(r) {
    return h(this, o).includes(r);
  }
  get(r) {
    return this.has(r) ? this[r] : null;
  }
  all() {
    let r = {};
    return h(this, o).map((t) => {
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
    return h(this, o).map((s) => {
      typeof r == "string" && (s !== r ? t[s] = this.get(s) : r.includes(s) || (t[s] = this.get(s)));
    }), t;
  }
}
o = new WeakMap();
const l = {
  install(e, r = "Form") {
    try {
      r = r || "Form", e.config.globalProperties[`$${r}`] = n, window[r] = n;
    } catch {
      console.warn("[Sadrix-Vue-Fomr]: propName is invalid: " + r);
    }
  }
};
export {
  l as default
};
