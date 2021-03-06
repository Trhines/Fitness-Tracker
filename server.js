const express = require('express')
const mongoose = require('mongoose')
// const path = require('path')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3000


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))
app.use(express.static("public"))

require('./routes/homeRoutes')(app);
require('./routes/apiRoutes')(app);

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

app.listen(PORT, () => console.log(`now listening on port ${PORT}`))