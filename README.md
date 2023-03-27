## Usage
To use the package, you need to first initialize the authentication server URL by calling the initializeApp method.

```js
const auth = require('vado-auth-nodejs');

auth.initializeApp({
  url: 'https://my-auth-server.com' // default url is http://127.0.0.1:8000
});
```

#### createUserWithEmailAndPassword()       
Use the createUserWithEmailAndPassword method to create a new user account. It requires an email and password, and optional fields like first name, last name, and phone number can also be passed.

```js
const result = await auth.createUserWithEmailAndPassword('user@example.com', 'mypassword', {
  firstName: 'John', // optional
  lastName: 'Doe', // optional
  phoneNumber: '123-456-7890' // optional
});

console.log(result);
```

#### signInWithEmailAndPassword()     
Use the signInWithEmailAndPassword method to sign in to an existing user account. It requires an email and password.

```js
const result = await auth.signInWithEmailAndPassword('user@example.com', 'mypassword');

console.log(result);
```
