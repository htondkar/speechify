import { useCallback, useEffect, useState } from "react"

import { PlayingState, SpeechEngine, createSpeechEngine } from "./speech"

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [speechEngine, setSpeechEngine] = useState<SpeechEngine | null>(null)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ])

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused")

  // The boundary event of the Web Speech API is fired when the spoken utterance reaches a word or sentence boundary.
  const handleOnBoundary = useCallback((e: SpeechSynthesisEvent) => {
    // get the current sentence
    const currentSentence = sentences[currentSentenceIndex]

    if(!currentSentence) {
      return
    }

    // get the current charecter index of the spoken sentence, which will be at
    // the boundary of the new word
    const currentCharIndex = e.charIndex

    // take the first word after the current char index
    const currentWord = currentSentence.slice(currentCharIndex).split(" ")[0]

    const currentWordLength = currentWord.length

    setCurrentWordRange([
      currentCharIndex,
      currentCharIndex + currentWordLength,
    ])
  }, [])

  const reset = useCallback(() => {
    setCurrentSentenceIndex(0)
    setCurrentWordRange([0, 0])
  }, [])

  // The end event of the Web Speech API SpeechSynthesisUtterance object is fired when the utterance has finished being spoken.
  const handleOnEnd = useCallback((e: SpeechSynthesisEvent) => {
    setCurrentSentenceIndex((prev) => prev + 1)
  }, [])

  const handleOnStateUpdate = useCallback((newState: PlayingState) => {
    setPlaybackState(newState)
  }, [])

  useEffect(() => {
    const speechEngine = createSpeechEngine({
      onEnd: handleOnEnd,
      onBoundary: handleOnBoundary,
      onStateUpdate: handleOnStateUpdate,
    })

    setSpeechEngine(speechEngine)

    return () => {
      speechEngine.cancel()
    }
  }, [])

  useEffect(() => {
    if (speechEngine) {
      speechEngine.load(sentences[currentSentenceIndex])
    }
  }, [speechEngine, sentences, currentSentenceIndex])

  const play = useCallback(() => {
    if (speechEngine) {
      speechEngine.play()
    }
  }, [speechEngine])

  const pause = useCallback(() => {
    if (speechEngine) {
      speechEngine.pause()
    }
  }, [speechEngine])

  return {
    currentSentenceIndex,
    reset,
    currentWordRange,
    playbackState,
    play,
    pause,
  }
}

export { useSpeech }
