import React from 'react';
import { useMusic } from './MusicContext';
import sound from './../../assets/musicon.svg';
import sound2 from './../../assets/musicoff.svg';

const Music = ({ className = '', style = {} }) => {
  const { muted, setMuted } = useMusic();
  return (
    <button
      className={`iconbtnmian iconSettings ${className}`}
      style={style}
      onClick={() => setMuted(prev => !prev)}
      aria-label={muted ? 'تشغيل الموسيقى' : 'كتم الموسيقى'}
    >
      <img src={muted ? sound2 : sound} alt="" />
    </button>
  );
};

export default Music;