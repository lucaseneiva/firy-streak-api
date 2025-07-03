// 1. Importar o Express e os nossos dados
const express = require('express');
const quotes = require('./src/quotes.json');

// 2. Inicializar o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do ambiente ou 3000 como padrão

// Middleware para parsear JSON (não precisamos para GET, mas é boa prática ter)
app.use(express.json());

// 3. Definir nossas rotas (endpoints)

// Rota de "saúde" da API, para ver se está no ar
app.get('/', (req, res) => {
    res.send('API do Firy Streak está no ar! 🔥');
});

// Rota que retorna TODAS as frases
app.get('/quotes', (req, res) => {
    console.log("Endpoint /quotes foi chamado.");
    res.json(quotes); // .json() já formata a resposta como JSON e seta os headers
});

// Rota INTELIGENTE que retorna UMA frase aleatória, com filtros
app.get('/quotes/random', (req, res) => {
    const { type, category } = req.query; // Pega os filtros da URL, ex: ?type=motivation

    console.log(`Endpoint /quotes/random foi chamado com filtros:`, req.query);

    let filteredQuotes = [...quotes]; // Cria uma cópia da lista de frases

    if (type) {
        filteredQuotes = filteredQuotes.filter(q => q.type === type);
    }
    if (category) {
        filteredQuotes = filteredQuotes.filter(q => q.category === category);
    }

    if (filteredQuotes.length === 0) {
        return res.status(404).json({ error: "Nenhuma frase encontrada para os filtros fornecidos." });
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    res.json(randomQuote);
});

// 4. Iniciar o servidor e fazê-lo "ouvir" por requisições
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});