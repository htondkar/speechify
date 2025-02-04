import React from 'react';
import { PlayingState } from '../lib/speech';

type Props = {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
};

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: Props) => {

  const handlePlay: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (state !== 'playing' && state !== 'ended') {
      play();
    }
  }

  const handlePause: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (state === 'playing') {
      pause();
    }
  }

  const handleLoadNewContent: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (state === 'playing') {
      pause();
    }

    loadNewContent();
  }

  return <div>
    <button type='button' onClick={handlePlay}>Play</button>
    <button type='button' onClick={handlePause} >Pause</button>
    <button type='button' onClick={handleLoadNewContent}>Load new content</button>
  </div>;
};
