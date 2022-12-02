const express = require('express');
const app = express();
const cors = require('cors');

// Settings
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.set('json spaces', 2)

// Middlewares
app.use(express.json())

// Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
})
