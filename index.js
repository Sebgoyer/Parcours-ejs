const express = require('express');
const router = require('./modules/router');

const app = express();


app.locals.user = null;

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));


app.use(express.urlencoded({ extended: true}));

app.use(router);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port} et accessible via http://localhost:${port}`);
});