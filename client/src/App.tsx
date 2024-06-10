import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Start from './components/Start';
import Join from './components/Join';
import useWebSocket, { ReadyState } from "react-use-websocket"


const WS_URL = "ws://localhost:8080";


function App() {
  useWebSocket(WS_URL, {
    share: true,
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );


}





export default App;