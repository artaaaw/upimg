const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sharp = require('sharp');
const multer = require('multer');


//Set EJS as template Engine!!
app.set('view engine', 'ejs')
app.set('views', 'views')

//Set Body Parser!!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//*  Set config for multer *****//
// 4 storage we use multer.memoryStorage() => this save image in virtual memory
// cause we dont want store image before resize it!!
var upload = multer({ storage: multer.memoryStorage() })



app.post('/send', upload.single('cover'), async (req, res) => {
    //After Upload image
    //we put them in file variable
    const file = req.file;
    //with sharp we can resize image any width and height that we want!!
    //tofile=> where image want to sve?! 
    //width: 450px & height: 300px
    await sharp(file.buffer).resize(300, 300).toFile(`./images/${Date.now()}.jpeg`);
    res.render('index');
})

app.get('/', (req, res) => {
    res.render('index')
})


app.listen(4000, () => { console.log('Server is Running!!') })