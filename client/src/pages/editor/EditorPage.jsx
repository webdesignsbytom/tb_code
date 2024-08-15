import React, { useEffect, useRef, useState } from 'react';
import ConnectionManager from '../../components/socket/ConnectionManager';
import { socket } from '../../socket';
import { BUTTON_SYTLE } from '../../utils/Constants';

function EditorPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    username: 'Tom',
  });

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    function onConnect() {
      console.log('CONNECTED >>>>');
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageReceive(messageData) {
      console.log('messageReceive >>>>', messageData.message);
      // setMessages((prevMessages) => [...prevMessages, messageData]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message-receive', onMessageReceive);  // Listen for incoming messages


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message-receive', onMessageReceive);  // Listen for incoming messages
    };
  }, [socket]);

  const handleMessageChange = (event) => {
    setIsTyping(true);
    setMessage(event.target.value);

    // Clear the previous timeout if the user continues typing
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to turn off `isTyping` after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message-send', { username: user.username, message: message})
    }
  };

  return (
    <div className='grid grid-rows-reg w-full min-h-screen h-full'>
      <div className='bg-slate-700 flex justify-between text-white py-6 px-4'>
        <div className='grid items-center'>
          <p>Connection State: {isConnected ? 'Connected' : 'Not Connected'}</p>
        </div>
        <ConnectionManager isConnected={isConnected} />
      </div>

      <section className='grid grid-rows-reg w-full h-full bg-slate-50'>
        <div className='grid h-fit gap-2 mx-auto w-1/2 py-4'>
          <form className='grid'>
            <div className='grid gap-2'>
              <label
                htmlFor='message'
                className='flex items-center font-medium'
              >
                Message:
              </label>
              <input
                type='text'
                name='message'
                id='message'
                required
                value={message}
                onChange={handleMessageChange}
                className='form-control block w-full px-3 h-fit py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
          </form>

          <div className='grid justify-end'>
            <button className={BUTTON_SYTLE} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>

        {/* Message container */}
        <section className='grid h-full bg-red-100 py-4'>
          <div className='grid grid-rows-reg h-full gap-2 mx-auto w-1/2 p-2 bg-white rounded border border-solid border-gray-300 text-gray-700'>
            {/* Your message */}
            {isTyping && (
              <section className='border-gray-300 border-solid border-b-2 pb-2'>
                <span className='font-medium text-black'>
                  {user.username}:{' '}
                </span>
                {message}
              </section>
            )}
            {/* Messages */}
            <section className='grid w-full h-full overflow-hidden'>
              message
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}

export default EditorPage;
