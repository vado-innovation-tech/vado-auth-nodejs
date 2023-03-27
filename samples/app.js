
const { default: axios } = require('axios');
const express = require('express');

const auth = require('auth_service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

auth.initializeApp({ url: 'http://127.0.0.1:8000' });


app.post('/register', async (req, res) => {
    const data = req.body;

    const email = data.email;
    const password = data.password;

    const userPayload = await auth.createUserWithEmailAndPassword(email, password, { firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });

    res.send(userPayload);
});


app.post('/login', async (req, res) => {
    const data = req.body;

    const email = data.email;
    const password = data.password;

    const userPayload = await auth.signInWithEmailAndPassword(email, password);

    res.send(userPayload);

});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

