import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function loadNewContent(): Promise<string[]> {
  return fetchContent().then((content) => {
    const parsedSentences = parseContentIntoSentences(content)
    return parsedSentences;
  }).catch((error) => {
    return ["Failed to load content"]
  });
}

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWordRange, currentSentenceIndex, play, pause, playbackState, reset } = useSpeech(sentences);

  useEffect(() => {
    loadNewContent().then(setSentences)
  }, []);

  const handleLoadNewContent = () => {
    loadNewContent().then(setSentences)
    reset();
  }


  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading sentences={sentences} currentSentenceIndex={currentSentenceIndex} currentWordRange={currentWordRange} />
      </div>
      <div>
        <Controls loadNewContent={handleLoadNewContent} pause={pause} play={play} state={playbackState} />
      </div>
    </div>
  );
}

export default App;
