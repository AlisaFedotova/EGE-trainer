const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const testRoutes = require('./routes/test');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);  //регистрация движка рендеринга страниц
app.set('view engine','hbs'); //делаем hbs движком по умолчанию
app.set('views','views');   //регистрируем папку, где по умолчанию будут храниться все вьюшки
app.use(testRoutes);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://alicinia:ufhhbgjnnth@cluster0-xlimj.mongodb.net/test', {    //подключение бд
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log('Server has been started...')
        });
    } catch (e) {
        console.log(e);
    }
}
start();

