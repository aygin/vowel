import fs from "fs";
import decodeAudio from 'audio-decode';
import { detectVowels } from "./detect-vowels";

const INTEGRAL_STEP = 500;

const logSamples = (audioData , step) => {
  let index = 0;
  do {
    console.log(`Sample rate at ${index} is ` , audioData[index * step])
    index++;
  } while (step * index < audioData.length);
}

const findTimeStamp = (startTime , sampleRate , maxIndex) => {
  const realSampleIndexe = parseInt((maxIndex * INTEGRAL_STEP) + (INTEGRAL_STEP / 2)); //center of interval
  const maxTimeStamp = (realSampleIndexe / sampleRate) + startTime;
  console.log(`time that max happens is ${maxTimeStamp}`);
  return maxTimeStamp; //number
}

const findMaximums = (integratedSignal) => {
  let maxValue = integratedSignal[0];
  let maxIndex = 0;
  for (let i = 1; i < integratedSignal.length; i++) {
    if (integratedSignal[i] > maxValue) {
      maxValue = integratedSignal[i];
      maxIndex = i;
    }
  }
  return { maxIndex };
}

const integralOfSignal = (chunkAudioData) => {
  const accumulatedAudio = [];
  let accAudioSample = 0;
  chunkAudioData.forEach((audioSample , index) => {
    accAudioSample += Math.abs(audioSample);
    if(index % INTEGRAL_STEP === 0) {
      accumulatedAudio.push(accAudioSample);
      accAudioSample = 0;
    }
  });
  console.log(`audio integral is done. the length is ${accumulatedAudio.length} `);
  return accumulatedAudio;
}

const getIntegral = (startTime , endTime , channelData , sampleRate) => {
  const startSampletime = parseInt(startTime * sampleRate);
  const endSampletime = parseInt(endTime * sampleRate);
  const intervalSamples = channelData.slice(startSampletime , endSampletime);
  return integralOfSignal(intervalSamples);
}

const addVowelTimeStamps = (audioTranscribeData , channelData , sampleRate) => {
  const originalTranscribeData = structuredClone(audioTranscribeData);
  audioTranscribeData.forEach((transcribeChunk , index) => {
    const vowelInChunk = detectVowels(transcribeChunk);
    if(vowelInChunk !== undefined) {
      const {start: startTime , end: endTime} = transcribeChunk;
      if(vowelInChunk === "long") {
        // console.log("####### long vowel" , transcribeChunk.word);
        const integrated = getIntegral(startTime , endTime.toFixed(2) , channelData , sampleRate);
        const {maxIndex} = findMaximums(integrated);
        // console.log(`max index ${maxIndex}`);
        const maxTimeStamp = findTimeStamp(startTime , sampleRate , maxIndex);
        originalTranscribeData[index] = {...transcribeChunk , maxTimeStamp};
      } else {
        //short
        // console.log("####### short vowel" , transcribeChunk.word);
        const integrated = getIntegral(startTime , endTime.toFixed(2) , channelData , sampleRate);
        const {maxIndex} = findMaximums(integrated);
        // console.log(`max index ${maxIndex}`);
        const maxTimeStamp = findTimeStamp(startTime , sampleRate , maxIndex);
        originalTranscribeData[index] = {...transcribeChunk , maxTimeStamp};
      }
    }
  });
  return originalTranscribeData;
}

export const decodeAudioData = async (audioTranscribeData) => {
  // Read the audio file as a buffer
  const buffer = fs.readFileSync("src/SERVER/assets/audio/voice_3.ogg");
  
  // Decode the buffer to get AudioBuffer
  const audioBuffer = await decodeAudio(buffer);

  const {sampleRate , duration} = audioBuffer;
  
  // Now you can access audio data:
  console.log('Duration:', duration);
  console.log('Sample Rate:', sampleRate);
  // console.log('Number of Channels:', audioBuffer.numberOfChannels);
  
  // Get the raw audio data (Float32Array)
  const channelData = audioBuffer.getChannelData(0); // Get first channel
  console.log('Audio samples:', channelData.length);
  // logSamples(channelData , sampleRate);

  //get sample at time:
  // const sampleTime = 0; //second
  // const endTime = duration; //second
  // const startSampletime = parseInt(sampleTime * sampleRate);
  // const endSampletime = parseInt(endTime * sampleRate);
  // const intervalSamples = channelData.slice(startSampletime , endSampletime);
  // logSamples(intervalSamples , 400);
  // integralOfSignal(intervalSamples);
  return addVowelTimeStamps(audioTranscribeData , channelData , sampleRate);
}