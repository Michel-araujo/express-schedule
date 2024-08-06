
import express from 'express';
import routes from './routes.js';

// Sessao do usuario
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash'

// Configura o process do arquivo env
import dotenv from 'dotenv';

// Biblioteca para modelagem de dados do MongoDB
import mongoose from 'mongoose';

// Gerencia os repositorios
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import helmet from 'helmet';
import csurf from 'csurf';

// Componentes
import { accessLogs } from './src/middlewares/accessLogs.js';
import { csrfValidation, tokenValidation } from './src/middlewares/csrfToken.js';
import { alerts } from './src/middlewares/alerts.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Conexao bem sucedida! Conectado com à base de dados");
        app.emit('connected'); // passa um sinal "connected" como uma variavel, que o express pode ouvir 
    })
    .catch((e) => console.log(e));

// Configuração do middleware para analisar dados de formulário: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Middleware para analisar JSON
app.use(express.json());

// Configura o modulo connect mongo, que salva a sessao do usuario no banco MongoDB
const MongoStoreConfig = MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING,
    collectionName: 'sessions'
})
// Configura o modulo express-session, que cria sessao do usuario
const sesstioConfig = session({
    secret: 'myApp',
    resave:false,
    saveUninitialized: true,
    store: MongoStoreConfig,
})
app.use(sesstioConfig) 
app.use(flash()) // Configura a flash, modulo de armazenar mensagens temporárias na sessão do usuário

// Configurar a leitura do diretorio de arquivos staticos como raiz
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurar a leitura do diretorio de views
app.set('views', path.resolve(__dirname, 'src', 'views'));
// Configurar o EJS como motor de visualização
app.set('view engine', 'ejs');

app.use(helmet())
app.use(csurf())

// Configura de forma global os Middlewares personalizados 
app.use(accessLogs)
app.use(csrfValidation)
app.use(tokenValidation)
app.use(alerts)

// Configura o uso das rotas definidas no módulo 'routes'
app.use(routes);

app.on('connected', () => { // Esculta o sinal 'connected' emitido no express
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000/');
    });
});

