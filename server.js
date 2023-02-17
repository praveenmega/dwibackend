const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path:'./config.env'});

// if(process.env.JWT_SECRET){
//   console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   process.exit(1);
// }

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log('db connection established');
  });

const port = 9000;

app.listen(port,() => {
  console.log(`Server started on port ${port}...`);
});
