const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', { title: 'Otávio | Desenvolvedor Web' });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
