import React from 'react';

interface AudioWaveProps {
  isPlaying: boolean;
}

const AudioWave: React.FC<AudioWaveProps> = ({ isPlaying }) => {
  return (
    <div className={`audio-wave ${isPlaying ? 'playing' : ''}`}>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
    </div>
  );
};

export default AudioWave;
