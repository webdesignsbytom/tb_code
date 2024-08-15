import React from 'react';
import { socket } from '../../socket';
// Constants
import { BUTTON_SYTLE } from '../../utils/Constants';

function ConnectionManager({ isConnected }) {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <section className='grid grid-cols-2 w-fit gap-4'>
      <button className={BUTTON_SYTLE} onClick={connect} disabled={isConnected}>
        Connect
      </button>
      <button className={BUTTON_SYTLE} onClick={disconnect}>
        Disconnect
      </button>
    </section>
  );
}

export default ConnectionManager;
