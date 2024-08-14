import React, { useContext, useEffect } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Constants
import { HOME_PAGE_URL } from '../../utils/Constants';

function HomePage() {
  const { setActiveNav } = useContext(ToggleContext);

  useEffect(() => {
    setActiveNav(HOME_PAGE_URL);
  }, []);

  useEffect(() => {
    const socket = io();

    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/javascript');

    editor.on('change', () => {
      const code = editor.getValue();
      socket.emit('codeChange', code);
    });

    socket.on('codeUpdate', (code) => {
      editor.setValue(code, -1); // -1 keeps the cursor position
    });
  }, []);

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg overflow-hidden max-h-screen'>
      <Navbar />
      {/* Main */}
      <main className='grid h-full p-1 items-center justify-center'>
        <section>
          <div className='grid text-center outline outline-2 outline-black rounded-xl bg-main-colour px-6 py-8'>
            <article className=''>home</article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
