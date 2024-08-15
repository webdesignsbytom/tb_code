import React, { useEffect, useRef, useState } from 'react';
// Components
import ConnectionManager from '../../components/socket/ConnectionManager';
// Socket
import { socket } from '../../socket';
// Constants
import {
  BUTTON_SYTLE,
  INPUT_SYTLE,
  MESSAGE_STYLE,
} from '../../utils/Constants';
// Functions
import { getColorForUsername } from '../../utils/Functions';
import { processMessage } from '../../utils/Cryptography';

function EditorPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [groupMessages, setGroupMessages] = useState([]);
  const [user, setUser] = useState({
    username: 'Tom',
  });

  console.log('groupMessages', groupMessages);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageReceive(messageData) {
      const newData = messageData.message;
      console.log('new data', newData);

      let data = {
        username: newData.hashedUser,
        message: newData.hashedMessage,
      };

      console.log('data', data);
      setGroupMessages((prevMessages) => [...prevMessages, data]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message-receive', onMessageReceive); // Listen for incoming messages

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message-receive', onMessageReceive); // Listen for incoming messages
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
    const messageItem = {
      message: message,
      username: user.username,
    }

    if (message.trim()) {
      processMessage(messageItem).then((hashedMessage, hashedUser) => {
        console.log('Hash computed:', hashedMessage);

        socket.emit('message-send', {
          username: hashedUser,
          message: hashedMessage,
        });
      });
    }
  };

  return (
    <div className='grid grid-rows-reg w-full min-h-screen max-h-screen overflow-hidden h-full'>
      <div className='bg-slate-700 flex justify-between text-white py-6 px-4'>
        <div className='grid items-center'>
          <p>Connection State: {isConnected ? 'Connected' : 'Not Connected'}</p>
        </div>
        <ConnectionManager isConnected={isConnected} />
      </div>

      <section className='grid grid-rows-reg w-full h-full bg-slate-50 overflow-hidden'>
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
                className={INPUT_SYTLE}
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
        <section className='grid h-full py-4 overflow-hidden'>
          <div className={MESSAGE_STYLE}>
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
              <div className='grid h-fit overflow-hidden w-full'>
                <div className='grid gap-1 h-full overflow-y-auto w-full'>
                  {groupMessages.length > 0 &&
                    groupMessages?.map((item, index) => {
                      const usernameColor = getColorForUsername(item.username);

                      return (
                        <ChatItem
                          key={index}
                          item={item}
                          colour={usernameColor}
                        />
                      );
                    })}
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}

const ChatItem = ({ item, colour }) => {
  return (
    <article className='grid h-fit w-full rounded border border-solid border-gray-300 px-1 py-0.5'>
      <div className='grid w-full'>
        <div>
          <span className='font-medium' style={{ color: colour }}>
            {item.username}
          </span>
        </div>
        <div>
          <span>{item.message}</span>
        </div>
      </div>
    </article>
  );
};

export default EditorPage;
