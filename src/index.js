// mixins
import Form from "./form"

export default {
    install(app, propName = 'Form') {
        try {
            propName = propName ? propName : 'Form'
            app.config.globalProperties[`$${propName}`] = Form
            window[propName] = Form        
        } catch(e) {
            console.warn('[Sadrix-Vue-Fomr]: propName is invalid: ' + propName);
        }
    }
}