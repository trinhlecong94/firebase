const functions = require('firebase-functions');
const admin = require('firebase-admin');
var firebaseConfig = {
      apiKey: "AAAArE1paJo:APA91bGvNmE8ZDRpOIfvWC4vZ-gkR0v0tOuKuPze5suEPYnM2jgb5Tgpg_X9dUTofUDCogM6EVT0ZVO3CdYcMzcr0MgnD7aYD-23N7UBTmvncHnzfG3Y_mAtw-UjF1XKuJgUMybzLkA3",
      authDomain: "fir-website-14f6d.firebaseapp.com",
      databaseURL: "https://fir-website-14f6d.firebaseio.com",
      projectId: "fir-website-14f6d",
      storageBucket: "fir-website-14f6d.appspot.com",
      messagingSenderId: "740033128602",
    };

admin.initializeApp(firebaseConfig);
let db = admin.firestore();

const express = require("express");
let app = express();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.text({ type: "text/plain" })); 
const cors = require("cors");
app.use(cors({ origin: true }));



app.post('/user',(request,response)=>{
    let docRef = db.collection('users').doc();
    let setAda = docRef.set(request.body);
    response.send(`${Date.now()}`);
});

app.get('/user',(request,response)=>{
    var users =[];
    db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
        users.push(doc);
    });
    })
    .then( (responseToClient)=>{
        response.json(users);
    }
    )
    .catch((err) => {
        console.log('Error getting documents', err);
    }); 
});



app.post('/delete-user/',(request,response)=>{
    var userId = request.body.userId;
    let deleteDoc = db.collection('users').doc(userId).delete();
});

exports.app = functions.https.onRequest(app);