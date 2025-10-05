import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, fetchChatHistory } from '../features/chatSlice';

const ChatBox = () => {
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.chat);
  const [input, setInput] = useState('');
  const userId = 'user1'; // Hardcoded for demo

  useEffect(() => {
    dispatch(fetchChatHistory(userId));
  }, [dispatch, userId]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage({ message: input, userId }));
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.type === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-300 text-black self-start'
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs opacity-75">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        {status === 'loading' && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            disabled={status === 'loading'}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
