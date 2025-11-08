import fs from "fs";
import OpenAI from "openai";
import { detectVowels } from "./utils/detect-vowels";
import { test_transcript } from "./services/test-transcript";
import { playAudio } from "./utils/player";

playAudio();

test_transcript.forEach((obj) => {
  setTimeout(() => {
    detectVowels(obj);
  }, obj.start.toFixed(3) * 1000);
});

// const openai = new OpenAI({
//   apiKey:
//     "YOUR_API_KEY",
// });

// const transcribeAudio = async () => {
//   const resp = await openai.audio.transcriptions.create({
//     file: fs.createReadStream("voice_1.ogg"),
//     model: "whisper-1", // OpenAI’s Whisper model
//     response_format: "verbose_json", // includes word-level timestamps
//     timestamp_granularities: ["word"]
//   });

//   console.log(resp);

//   return resp;
// }

// transcribeAudio();

// setInterval(()=>{
//     port.write('main screen turn on', function(err) {
//       if (err) {
//         return console.log('Error on write: ', err.message)
//       }
//       console.log('message written')
//     })
// } , 2000)

// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//   console.log('Error: ', err.message)
// })
