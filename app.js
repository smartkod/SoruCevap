const express = require('express');
const { engine } = require('express-handlebars');
const { join } = require('path');
require('dotenv').config();

const app = express();
let PORT = process.env.PORT || 3000;

//! Template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views'));

//! Middleware
app.use(express.static(join(__dirname, 'public')));

//! Routes
app.get('/', (req, res) => {
  res.render('site/index');
});

//! Dinamik port kontrolü
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Server is running at http://127.0.0.1:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(PORT);
