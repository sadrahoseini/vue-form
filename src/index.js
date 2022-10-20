// mixins
import Form from "./form"

export default {
    install(app, propName = 'Form') {
        app.config.globalPropertie[`$${propName}`] = Form
        window[`$${propName}`] = Form        
    }
}