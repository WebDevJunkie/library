const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
    .get((req, res) => {
        res.send('hello books');
    });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    res.render(
        'index', 
        { 
            nav: [{ link: '/authors', title: 'Authors' }, { link: '/books', title: 'Books' }], 
            title: 'Library'
        }
    );
});

app.listen(port, () => { 
    debug.log(`Listening on port ' ${chalk.green(port)}`);
});
