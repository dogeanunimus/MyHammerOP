const mongoose = require('mongoose');
const uri = process.env.conexiondb;

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

});

mongoose.connection.on('open', _ => {
    console.log('Me he conectado correctamente a la base de datos');
})

