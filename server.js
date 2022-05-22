// require dependencies express & mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.MONGODB_URI || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

// connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewURLParser: true,
    useUnifiedTopology: true
});

// listener
app.listen(PORT, () => console.log(`app listening on localhost:${PORT}`))