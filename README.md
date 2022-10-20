# Sadrix Vue Form

Simple Javascript classes for handle form fields and errors.

## How to use

Simply import package from npm and add it as a plugin to your Vue app:

``` JavaScript
import { createApp } from 'vue';
import VueForm from 'sadrix-vue-form';

const app = createApp();
app.use(VueForm, 'Form');
app.mount('#app');

```

As you can see in ```.use(VueForm, 'Form')```, second property is the name of global prop for Form class in your application. So feel free to set any name you want. The default will be ```'Form'``` with capital ```'F'```. 

After adding plugin to your application, now you can use it in two ways:

``` JavaScript
<script>
export default {
    data() {
        return {
            form: new Form({
                username: '',
                password: ''
            })
        }
    }
}
</script>
```

or

``` JavaScript
<script>
export default {
    data() {
        return {
            form: new this.$Form({
                username: '',
                password: ''
            })
        }
    }
}
</script>
```

## Error handling

### 1. Set errors

If you want to set errors for your form fields:

``` JavaScript
// set() method will reset form errors and set it to new errors
this.form.errors.set({
    username: 'This username taken before',
    password: 'Password must contain at least one character'
});

// add() method will add or rewrite field error (Not refresh form errors)
this.form.errors.add({
    password: 'Password must contain at least one character'
});
```

### 2. Get field error

If field with certain name has any error, this method will return it otherwise will return empty string:

``` JavaScript
// get() method will return form error or empty string
this.form.errors.get('username');
```

### 3. Clear form errors

By using ```.clear()``` with no params, all form errors will be removed.
If you pass a field name, only field error will be removed.
You can pass an array of field names too.

``` JavaScript
// clear() method
// clear all errors
this.form.errors.clear();

// clear single field error
this.form.errors.clear('username');

// clear multi fields errors
this.form.errors.clear(['username', 'password']);
```