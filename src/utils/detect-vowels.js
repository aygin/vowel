import { VOWELS_LIST } from "../services/constants";
import { sendSignal } from "./serial-port";

export const detectVowels = (chunk) => {
  if (chunk.word !== undefined) {
    chunk.word.split("").forEach((char) => {
      if (VOWELS_LIST.includes(char)) {
        console.log("detect a vowel", chunk, char);
        sendSignal();
      }
    });
  }
};
