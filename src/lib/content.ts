const API_URL = "http://localhost:5174/content"

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  const fallbackError = "<speak><s>There was an error</s></speak>"  
  try {
    const response = await fetch(url)
    if (response.ok) {
      return await response.text()
    }
    return fallbackError
  } catch (error) {
    return fallbackError
  }
}

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */

//  "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>",
const parseContentIntoSentences = (content: string) => {
  const sentences = content.match(/<s>(.*?)<\/s>/g)
  return sentences ? sentences.map(sentence => sentence.replace(/<\/?s>/g, "")) : []
}

export { fetchContent, parseContentIntoSentences }
