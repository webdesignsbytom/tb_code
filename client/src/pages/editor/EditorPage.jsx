import React, { useEffect, useState } from 'react'
import ConnectionManager from '../../components/socket/ConnectionManager';
import { socket } from '../../socket';

function EditorPage() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
  
    useEffect(() => {
      function onConnect() {
        setIsConnected(true);
      }
  
      function onDisconnect() {
        setIsConnected(false);
      }
  
      function onFooEvent(value) {
        setFooEvents(previous => [...previous, value]);
      }
  
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('foo', onFooEvent);
      };
    }, []);
  
    return (
      <div className="App">
        <p>State: { '' + isConnected }</p>

        <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>

        <ConnectionManager />

      </div>
    );
}

export default EditorPage