import fs from "fs";
import OpenAI from "openai";
import  {SerialPort} from "serialport";

import { spawn } from "child_process";

const port = new SerialPort({
    path : '/dev/tty.usbserial-10',
    baudRate: 115200
});

const sendSignal = () => {
      port.write('M', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written')
    })
}

// replace with the path to your audio file
const file = "voice_1.ogg";

// spawn ffplay without a display window
const player = spawn("ffplay", ["-nodisp", "-autoexit", file], {
  stdio: "ignore" // ignore ffplay logs
});

console.log("🎵 Starting playback now:", file);

player.on("exit", (code) => {
  console.log("✅ Playback finished:", file);
});

const VOWELS = ["a" , "o"]; 

const detectVowels = (chunk) => {
  if(chunk.word !== undefined) {
    chunk.word.split("").forEach(char => {
      if(VOWELS.includes(char)) {
        console.log("detect a vowel" , chunk , char);
        sendSignal()
      }
    });
  }
}

const test_array = [
  { word: 'My', start: 0, end: 1.1799999475479126 },
    {
      word: 'name',
      start: 1.1799999475479126,
      end: 1.4199999570846558
    },
    { word: 'is', start: 1.4199999570846558, end: 1.7400000095367432 },
    {
      word: 'Alex',
      start: 1.7400000095367432,
      end: 2.0199999809265137
    },
    { word: 'I', start: 4.300000190734863, end: 4.900000095367432 },
    { word: 'came', start: 4.900000095367432, end: 5.119999885559082 },
    { word: 'from', start: 5.119999885559082, end: 5.380000114440918 },
    { word: 'Italy', start: 5.380000114440918, end: 5.599999904632568 }
];

test_array.forEach((obj) => {
  setTimeout(() => {
    detectVowels(obj)
  } , obj.start.toFixed(3) * 1000)
})


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
