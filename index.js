const express = require('express');
const { dbConnection } = require('./config/config');
const app = express();
const PORT = 3000;


dbConnection()



//MIDDLEWARE (funcion que ejecutas antes de las rutas)
app.use(express.json());

//ROUTES /prefix
app.use('/comments', require('./routes/comments'));
app.use('/users', require('./routes/users'))








app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

