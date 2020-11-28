const mongoose = require('mongoose');
const uri = process.env.conexiondb;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

mongoose.connection.on('open', _ => {
    console.log('Me he conectado correctamente a la base de datos', uri);
})

