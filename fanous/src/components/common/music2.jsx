import React from 'react';
import { useMusic } from './MusicContext';
import sound from './../../assets/musicon.svg';
import sound2 from './../../assets/musicoff.svg';

const GameMusic = ({ className = '', style = {} }) => {
  const { muted, toggle } = useMusic();

  return (
    <button
      className={`iconbtnmian iconSettings ${className}`}
      style={style}
      onClick={toggle}
    >
      <img src={muted ? sound2 : sound} alt="" />
    </button>
  );
};

export default GameMusic;