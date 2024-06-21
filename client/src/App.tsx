import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Start from './components/Start';
import Join from './components/Join';

function App() {

  const [socket, setSocket] = useState<WebSocket | null>(null);


  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);


    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ type: 'hello', message: 'Hello from the client!' }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message.message);
    };


    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start socket={socket} />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;