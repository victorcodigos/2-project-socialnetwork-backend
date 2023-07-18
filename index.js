const express = require('express');
const app = express();
const PORT = 3000;

const { dbConnection } = require('./config/config');
const { handleTypeError }= require('./middleware/errors');


dbConnection()


//MIDDLEWARE (funcion que ejecutas antes de las rutas)
app.use(express.json());



//ROUTES /prefix
app.use('/comments',require('./routes/comments'));
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))

//MIDDLEWARE (funcion que ejecutas despues de las rutas)
app.use(handleTypeError)

//LISTEN
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

