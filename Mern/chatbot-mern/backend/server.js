const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure safarte folder exists
const safarteDir = path.join(__dirname, 'safarte');
if (!fs.existsSync(safarteDir)) {
  fs.mkdirSync(safarteDir);
}

// Simple bot response
function getBotResponse(message) {
  if (message.toLowerCase().includes('hello')) {
    return 'Hello! How can I help you today?';
  } else if (message.toLowerCase().includes('bye')) {
    return 'Goodbye! Have a great day!';
  } else {
    return 'I am a simple chatbot. You said: ' + message;
  }
}

// POST /api/chat/send
app.post('/api/chat/send', (req, res) => {
  const { message, userId } = req.body;
  if (!message || !userId) {
    return res.status(400).json({ error: 'Message and userId are required' });
  }

  const response = getBotResponse(message);

  // Create user directory if not exists
  const userDir = path.join(safarteDir, userId.toString());
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  // Save chat
  const chatData = {
    timestamp: new Date().toISOString(),
    message,
    response
  };

  const fileName = `${Date.now()}.json`;
  const filePath = path.join(userDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(chatData, null, 2));

  res.json({ response });
});

// GET /api/chat/history/:userId
app.get('/api/chat/history/:userId', (req, res) => {
  const { userId } = req.params;
  const userDir = path.join(safarteDir, userId.toString());

  if (!fs.existsSync(userDir)) {
    return res.json([]);
  }

  const files = fs.readdirSync(userDir).filter(file => file.endsWith('.json'));
  const chats = files.map(file => {
    const filePath = path.join(userDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  });

  // Sort by timestamp
  chats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  res.json(chats);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
