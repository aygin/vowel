import { apiCall } from "./services/api";
import audioFile from './assets/voice_3.ogg';

export const attachTranscribeClickListener = () => {
    const transcribeBtn = document.querySelector('button');
    if (transcribeBtn) {
        transcribeBtn.addEventListener('click', async () => {
            console.log("clicked on button!");
            apiCall();
            playAudio();
        });
    } else {
        console.error("### button element not found!");
    }
}

const playAudio = () => {
    const audioSource = new Audio(audioFile);
    audioSource.addEventListener('error', (e) => {
        console.error('Audio error:', e); // check console for 404
    });
    audioSource.addEventListener('canplaythrough' , () => {
        audioSource.play();
    })
    console.log(`audio loaded ${audioSource}. Playing... ${audioSource.volume}`);
}