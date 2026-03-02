import { apiCall } from "./services/api";
import audioFile from './assets/voice_3.ogg';
import { animateMouth } from "./animateMouth";

const audioAnimateQueue = []; //{time: number , exec: () => () , triggered: boolean}

export const attachTranscribeClickListener = () => {
    const transcribeBtn = document.querySelector('button');
    if (transcribeBtn) {
        transcribeBtn.addEventListener('click', async () => {
            console.log("clicked on button!");
            apiCall().then((response) => {
                if(response.isError) {
                    console.error('an error in api - we will not play audio');
                    return;
                }
                else {
                    const {audioData} = response;
                    if(audioData !== undefined) {
                        audioData.forEach(audioRes => {
                            if(audioRes.maxTimeStamp !== undefined) {
                                audioAnimateQueue.push({
                                    time: audioRes.maxTimeStamp,
                                    exec: animateMouth,
                                    triggered: false
                                })
                            }
                        });
                        playAudio();
                    }
                    else {
                        console.log(`audio date is undefined!` , response)
                    }
                }
            });
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
        console.log(`current audioAnimation` , audioAnimateQueue)
    })
    audioSource.addEventListener('timeupdate' , () => {
        audioAnimateQueue.forEach((queue) => {
            if(!queue.triggered && audioSource.currentTime >= queue.time) {
                console.log(`we have to animate!`);
                queue.triggered = true;
                queue.exec();
            }
        })
    })
    console.log(`audio loaded ${audioSource}. Playing... ${audioSource.volume}`);
}