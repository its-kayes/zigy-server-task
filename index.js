const express = require('express');
const cors = require('cors');
require('dotenv').config();
let app = express()
let port = process.env.PORT || 8000
app.use(express())
app.use(cors())





app.get('/', (req, res) => {
    res.send('Server running...')
});
app.listen(port, ()=> {
    console.log('Server on fire...')
})