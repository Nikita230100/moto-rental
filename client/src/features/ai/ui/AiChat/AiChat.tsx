import { AiApi } from '../../api/AiApi';
import './AiChat.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serverResponse = await AiApi.generateText(prompt);
      setResponse(serverResponse.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='ai-chat'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Задайте вопрос...'
          rows={4}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Загрузка...' : 'Отправить'}
        </button>
      </form>

      {response && (
        <div className='response'>
          <h3>Ответ:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default AIChat;