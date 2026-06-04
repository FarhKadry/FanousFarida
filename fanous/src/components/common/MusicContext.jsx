import { createContext, useContext, useState, useEffect, useRef } from 'react';
import musicFile from './../../assets/audio/restmusic.m4a';

const MusicContext = createContext();

const audio = new Audio(musicFile);
audio.loop = true;

export const MusicProvider = ({ children }) => {
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    if (muted) {
      audio.play();
    } else {
      audio.pause();
    }
    setMuted(prev => !prev);
  };

  return (
    <MusicContext.Provider value={{ muted, toggle }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);