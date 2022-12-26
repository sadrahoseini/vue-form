# Sadrix Vue Form

Simple Javascript classes for handle form fields and errors.

## Installation

Install latest version with ```npm```:
```
npm i sadrix-vue-form
```

View package on [npm website](https://www.npmjs.com/package/sadrix-vue-form).

## How to use

### Add plugin to Vue app
Simply import package from npm and add it as a plugin to your Vue app:

``` JavaScript
import { createApp } from 'vue';
import VueForm from 'sadrix-vue-form';

const app = createApp();
app.use(VueForm, 'Form');
app.mount('#app');

```

### Define new Form data property

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

### &lt;script Setup&gt; format

``` JavaScript
<script setup>
import { ref } from 'vue'

const form = ref({
    username: '',
    password: ''
})
</script>
```


### Access form field value in Vue template

If you add Form as component data property, Now you can set input value to form field like this:

``` JavaScript
<template>
    <div>
        <label for="username">Username:</label>
        <input type="text" v-model="form.username" id="username">
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" v-model="form.password"  id="password">
    </div>
</template>
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

// set() method with second param, don't reset form and set exact fields errors passed in second parameter
this.form.errors.set({
    username: 'This username taken before',
    password: 'Password must contain at least one character'
}, [
    // this array say only this fields should set and dont reset all errors
    'username'
]);

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