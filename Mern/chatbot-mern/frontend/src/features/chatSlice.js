import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for sending message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, userId }) => {
    const response = await fetch('http://localhost:5000/api/chat/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, userId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { message, response: data.response, timestamp: new Date().toISOString() };
  }
);

// Async thunk for fetching chat history
export const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  async (userId) => {
    const response = await fetch(`http://localhost:5000/api/chat/history/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map(chat => ({
      message: chat.message,
      response: chat.response,
      timestamp: chat.timestamp,
    }));
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push({
          type: 'user',
          text: action.payload.message,
          timestamp: action.payload.timestamp,
        });
        state.messages.push({
          type: 'bot',
          text: action.payload.response,
          timestamp: action.payload.timestamp,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchChatHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload.flatMap(chat => [
          { type: 'user', text: chat.message, timestamp: chat.timestamp },
          { type: 'bot', text: chat.response, timestamp: chat.timestamp },
        ]);
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
