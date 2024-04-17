import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  // Socket 연결
  const URL: string = 'http://localhost:9999';
  const socket = io(URL, { autoConnect: true, transports: ['websocket', 'polling'] });
  // console.log(socket);

  // States
  const [state, setState] = useState<{ message: string; name: string }>({ message: '', name: '' });
  const [chat, setChat] = useState<{ message: string; name: string }[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });

    socket.on('error', (error) => {
      alert(error);
    });

    return () => {
      socket.on('disconnect', () => {
        console.log(socket.id); // undefined
      });
    };
  }, [chat]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit('message', { name, message });
    setState({ message: '', name });
  };

  const RenderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className='card'>
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className='name-field'>
          <input name='name' value={state.name} onChange={onTextChange} />
        </div>
        <div>
          <input name='message' value={state.message} onChange={onTextChange} />
        </div>
        <button>Send Message</button>
      </form>
      <div className='render-chat'>
        <h1>Chat log</h1>
        <RenderChat />
      </div>
    </div>
  );
}
