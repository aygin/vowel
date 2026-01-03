import fs from "fs";
import decodeAudio from 'audio-decode';

const logSamples = (audioData , step) => {
  let index = 0;
  do {
    console.log(`Sample rate at ${index} is ` , audioData[index * step])
    index++;
  } while (step * index < audioData.length);
}

const removeSilence = (chunkAudioData) => {
  const accumulatedAudio = [];
  const integralStep = 500;
  let accAudioSample = 0;
  chunkAudioData.forEach((audioSample , index) => {
    accAudioSample += Math.abs(audioSample);
    if(index % integralStep === 0) {
      accumulatedAudio.push(accAudioSample);
      accAudioSample = 0;
    }
  });
  // accumulatedAudio.forEach((accSample , index) => {
  //   console.log(`sample acc at ${index}` , accSample);
  // });
  console.log(`audio integral is done. the length is ${accumulatedAudio.length} `)
}

export const decodeAudioData = async () => {
  // Read the audio file as a buffer
  const buffer = fs.readFileSync("src/assets/audio/voice_3.ogg");
  
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
  const sampleTime = 3.04; //second
  const endTime = 3.42; //second
  const startSampletime = parseInt(sampleTime * sampleRate);
  const endSampletime = parseInt(endTime * sampleRate);
  const intervalSamples = channelData.slice(startSampletime , endSampletime);
  logSamples(intervalSamples , 400);
  removeSilence(intervalSamples);
  
  return audioBuffer;
}