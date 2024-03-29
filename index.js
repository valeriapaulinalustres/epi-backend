import express from 'express'
import './src/persistence/dbConfig.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cors from 'cors'
import { PORT } from './src/utils.js'

import usersRouter from './src/persistence/routes/users.router.js'

const app = express()
app.use(cors())
//{"Access-Control-Allow-Origin" : "https://epi-six.vercel.app/" }
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//para evitar bloqueo de CORS
// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//   res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//   next(); 
// })
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

//cookie parser (para guardar id de session)
app.use(cookieParser())


// Session con Mongo
app.use(
  session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: 'mongodb+srv://valeriapaulinalustres:Artemisa37@cluster0.knm2ak6.mongodb.net/epi?retryWrites=true&w=majority'
    }),
  })
)

//rutas
app.use('/api/users', usersRouter)



app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 8082');
})
/*



import path from 'path'


import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'













//console.log(__dirname)

// archivos estaticos
//OJO QUE DETRÁS DE PUBLIC NO HAY BARRA, POR LO QUE DONDE SE NECESITE SEGUIR CON LA URL (EJEMPLO STYLE.CSS) HAY QUE PONERLE LA BARRA DELANTE
app.use(express.static(path.join(__dirname, '/public')))




  */