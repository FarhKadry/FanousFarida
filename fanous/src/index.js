import React from 'react';
import ReactDOM from 'react-dom/client';
import Paths from './paths';
import { MusicProvider } from './components/common/MusicContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MusicProvider>
      <Paths />
    </MusicProvider>
  </React.StrictMode>
);
