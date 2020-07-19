const express       = require("express");
const mongoose      = require("mongoose");
const winston       = require("winston");
const app           = express();
const booksRoute    =  require("./routes/books");
const router        = require("./routes/books");
require("dotenv").config();

const PORT = process.env.port || 3000

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// create a loggers
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
            format  : winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' })
    ]
  });

// routes
app.use('/api/books',booksRoute);

// connect to mongodb atlas
mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser:true}
).then(() => {
    logger.info("connected to mongodb atlas")
}).catch(error => {
    logger.error(error.message)
});

// start server
app.listen(PORT,() => {
    logger.info("Server started");
});