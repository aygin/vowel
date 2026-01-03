// import fs from "fs";
// import OpenAI from "openai";
import { addPhonetics, detectVowels } from "./utils/detect-vowels";
import { voice_3_transcript } from "./services/test-transcript";
import { playAudio } from "./utils/player";
import { initSerialPort } from "./utils/serial-port";

import { decodeAudioData } from "./utils/decode-audio";

await initSerialPort();
const transcriptWithPhonetics = await addPhonetics(voice_3_transcript)
await decodeAudioData();

await playAudio();
transcriptWithPhonetics.forEach((obj) => {
  // const startTime = obj.start.toFixed(3) * 1000;
  // const endTime = obj.end.toFixed(3) * 1000;
  // const avgTime = ((startTime + endTime) / 2).toFixed(3);
  setTimeout(() => {
    detectVowels(obj);
  }, obj.end.toFixed(3) * 1000);
});


// const openai = new OpenAI({
//   apiKey:
//     "",
// });

// const transcribeAudio = async () => {
//   const resp = await openai.audio.transcriptions.create({
//     file: fs.createReadStream("src/voice_3.ogg"),
//     model: "whisper-1", // OpenAI’s Whisper model
//     response_format: "verbose_json", // includes word-level timestamps
//     timestamp_granularities: ["word"]
//   });

//   console.log(resp);

//   return resp;
// }

// await transcribeAudio();