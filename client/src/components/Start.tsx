import { useEffect, useState } from 'react';
import { CgSpinnerAlt } from "react-icons/cg";

export default function Start({ socket }: { socket: WebSocket | null }) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [roomCode, setRoomCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    socket?.send(JSON.stringify({ type: 'hello', message: 'Hello from game client' }))
    

    fetch('/api/questions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        return response.json();
      })
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); 
      });


      fetch('/api/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setRoomCode(data.roomCode))
        .catch((error) => setError(error.message));
  }, []);


  return (
    <div>

      {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className='bg-white rounded-full border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]'>
              <CgSpinnerAlt className="h-32 w-32 text-yellow-400  animate-spin" />
            </div>
          </div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div className="flex flex-col m-4 items-center justify-center">
          <div className="bg-white flex items-center justify-center rounded border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-8">
            <div className="text-5xl">Join at <b>cacklecrash.com</b></div>

            <div className='h-32 w-32 ml-8 border-2 border-black' ></div>
          </div>
          
          <div>GAME PIN: {roomCode}</div>

      </div>
      )}



    </div>
  );
}
