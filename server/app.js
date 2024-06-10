const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const OpenAIApi = require('openai');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors({origin: '*'}));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

const getQuestions = async () => {

  completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Generate 10 unique, funny, and edgy questions that could be used in a party game similar to Cards Against Humanity." }],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
    n: 1,
    stop: ["11."],
    temperature: 1
  });

  const responseText = completion.choices[0].message.content;

  let questions = responseText.split('\n')
  .map(question => question.trim())
  .filter(question => question)
  .map(question => question.replace(/"/g, '')); 

  return questions;
}

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/questions', async (req, res) => {
  try {
      const questions = await getQuestions();
      res.json({ questions });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
