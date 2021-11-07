const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const app = express();
const Photo = require('./models/Photo');
const photoControllers = require('./controllers/photoControllers');
const pageControllers=require('./controllers/pageControllers')

//connect DB

mongoose.connect('mongodb+srv://hasan:gWzAL331TxNYODiY@cluster0.5hrrm.mongodb.net/pcat-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>{
  console.log("Connected DB")
}).catch((err)=>{
  console.log(err)
})

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

const port = process.env.PORT||5000;

//ROUTES

app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createdPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/about',pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);

app.get('/photos/edit/:id',pageControllers.getEditPage);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
