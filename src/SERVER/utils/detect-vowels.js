import { phonemize } from "phonemizer";
import {sendSignal} from "./serial-port"

const getPhonetics = async (rawWord) => {
  try {
    const phoneticedWord =  await phonemize(rawWord , "en-us");
    if(phoneticedWord.length !== 1) {
      console.log("phonetic has more than one or zero length - TODO: handle" , rawWord , phoneticedWord);
      return "";
    }
    return phoneticedWord[0];
  } catch (error) {
    console.error("###### error in phoneticing word" , error);
  }
}

export const addPhonetics = async (originalTranscript) => {
  const modifiedContent = [];
  for(const content of originalTranscript) {
    if(content.word !== undefined) {
      const phonetics = await getPhonetics(content.word);
      modifiedContent.push({...content , phonetics});
    } else {
      console.error("###### array has no word in this object" , content);
    }
  }
  return modifiedContent;
}

export const detectVowels = (chunk) => {
  if (chunk.phonetics !== undefined) {
    const LONG_VOWEL_REGEX = /aɪ|eɪ|ɔɪ|aʊ|oʊ|iː|uː|ɑː|ɔː|ɜː/g;
    const isLongFound = chunk.phonetics.match(LONG_VOWEL_REGEX);
    if(isLongFound !== null) {
      // console.log("long vowel found" , isLongFound , " " , chunk.word);
      sendSignal("long");
      return "long";
    }else{
      const SHORT_VOWEL_REGEX = /ɪ|ɛ|æ|ʌ|ɒ|ʊ|ə|ɑ|ɔ|e|i|o|u|a/g;
      const isShortFound = chunk.phonetics.match(SHORT_VOWEL_REGEX);

      if(isShortFound !== null) {
        // console.log("short vowel found" , isShortFound , " " , chunk.word);
        sendSignal("short");
        return "short";
      }
    }
  }
};
