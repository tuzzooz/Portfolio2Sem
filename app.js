const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
    database: 'portfolio'
});

app.get('/', async (req, res) => {
    try {
        const [projetos] = await pool.query('SELECT * FROM projetos');
        res.render('index', { 
            title: 'Otávio | Desenvolvedor Web',
            projetos: projetos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar projetos');
    }
});

app.get('/api/projetos', async (req, res) => {
    try {
        const [projetos] = await pool.query('SELECT * FROM projetos');
        res.json(projetos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: error.message });
    }
});

app.get('/api/projetos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [projetos] = await pool.query('SELECT * FROM projetos WHERE id = ?', [id]);
        
        if (projetos.length === 0) {
            return res.status(404).json({ erro: 'Projeto não encontrado' });
        }
        
        res.json(projetos[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: error.message });
    }
});

app.post('/api/projetos', async (req, res) => {
    try {
        const { nome, descricao, url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO projetos (nome, descricao, url) VALUES (?, ?, ?)',
            [nome, descricao, url]
        );
        console.log('Body recebido:', req.body);
        res.status(201).json({ 
            id: result.insertId, 
            nome, 
            descricao, 
            url 
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//{
  ///"nome": "teste",
  //"descricao": "teste",
  //"url": "teste.com"
//}


app.put('/api/projetos/:id', async (req, res) => {
    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ erro: "Body da requisição vazio ou inválido" });
        }
        const { id } = req.params;
        const { nome, descricao, url } = req.body;   
        const [result] = await pool.query(
            'UPDATE projetos SET nome = ?, descricao = ?, url = ? WHERE id = ?',
            [nome, descricao, url, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: "Projeto não encontrado" });
        }

        res.json({ id, nome, descricao, url });
    } catch (error) {
        console.error('Erro PUT:', error);
        res.status(500).json({ erro: error.message });
    }
});

app.delete('/api/projetos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM projetos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});