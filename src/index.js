// mixins
import Form from "./form"

export default {
    install(app, propName = 'Form') {
        app.config.prototype[`$${propName}`] = Form
        window[`$${propName}`] = Form        
    }
}