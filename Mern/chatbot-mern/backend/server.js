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

// Endpoint to send message and get response
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Simple bot response
  let response;
  if (message.toLowerCase().includes('hello')) {
    response = 'Hello! How can I help you today?';
  } else if (message.toLowerCase().includes('bye')) {
    response = 'Goodbye! Have a great day!';
  } else {
    response = 'I am a simple chatbot. You said: ' + message;
  }

  // Save chat to file
  const chatData = {
    timestamp: new Date().toISOString(),
    user: message,
    bot: response
  };

  const fileName = `chat_${Date.now()}.json`;
  const filePath = path.join(safarteDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(chatData, null, 2));

  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
