/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface StateProps {
  message: string;
  name: string;
}

export default function Home() {
  // Socket 연결
  const URL: string = 'http://localhost:9999';
  const socket = io(URL, {
    transports: ['websocket', 'polling'],
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': '1234'
      // Authorization: 'Bearer SS3316'
    }
  });
  // console.log(socket);

  // States
  const [state, setState] = useState<StateProps>({ message: '', name: '' });
  const [chat, setChat] = useState<StateProps[]>([]);

  useEffect(() => {
    // 서버로 부터 받음
    socket.on('connect', () => {
      // console.log(socket.io.engine.readyState);
      if (socket.io.engine.readyState === 'open') {
        if (socket.id !== undefined) setState({ ...state, name: socket.id, message: '' });
      }
    });

    // 서버로 부터 받음
    socket.on('message', ({ name, message }) => {
      setChat((prev) => [...prev, { name, message }]);
    });

    return () => {
      // unMount시 연결 해제
      socket.disconnect();
      socket.off();
    };
  }, [io]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit('message', { name, message }); // 서버로 전송
    setState({ message: '', name });
  };

  const RenderChat = () => {
    return (
      <>
        {state.name !== undefined && <p>{`유저 ${state.name}가 접속했습니다.`}</p>}
        {chat.map(({ name, message }, index) => (
          <div key={index}>
            <h3>
              {name}:<span>{message}</span>
            </h3>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='card'>
      <form onSubmit={onMessageSubmit}>
        <div className='name-field'>
          <input name='name' value={state.name} disabled />
        </div>
        <div>
          <input name='message' value={state.message} onChange={onTextChange} />
        </div>
        <button>Send Message</button>
      </form>
      <div className='render-chat'>
        <h1>log</h1>
        {/* {state.name !== undefined && <p>{`유저 ${state.name}가 접속했습니다.`}</p>} */}
        <RenderChat />
      </div>
    </div>
  );
}
