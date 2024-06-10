import { useEffect, useState } from 'react';


export default function Start() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/questions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        return response.json();
      })
      .then((data) => setQuestions(data.questions))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
    </div>
  );
}
