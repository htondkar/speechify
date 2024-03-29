type Props = {
  currentWordRange: [number, number];
  currentSentenceIndex: number;
  sentences: string[];
};

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIndex,
  sentences,
}: Props) => {
  return <div data-testid="currently-reading">
    {sentences.map((sentence, index) => (
      <p key={`p-${index}`} data-testid={index === currentSentenceIndex ? "current-sentence" : ""}>

        {sentence.split(" ").map((word, wordIndex) => {
          const wordIsBetweenCurrentWordRange = wordIndex >= currentWordRange[0] && wordIndex < currentWordRange[1];
          const wordIsInCurrentSentence = index === currentSentenceIndex;
          const wordIsTheCurrentWord = wordIsInCurrentSentence && wordIsBetweenCurrentWordRange

          return (
            <>
              <Word key={`w-${wordIndex}`} highlighted={wordIsTheCurrentWord} content={word} />
              {" "}
            </>
          )
        })}
      </p>
    ))}
  </div>;
};


function Word({ content, highlighted }: { highlighted: boolean, content: string }): JSX.Element {
  return (<span data-testid={highlighted ? "current-word" : ""}>
    {content}
  </span>)
}

