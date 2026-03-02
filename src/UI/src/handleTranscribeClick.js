import { apiCall } from "./services/api";

export const attachTranscribeClickListener = () => {
    const transcribeBtn = document.querySelector('button');
    if (transcribeBtn) {
        transcribeBtn.addEventListener('click', () => {
            console.log("clicked on button!");
            apiCall();
        });
    } else {
        console.error("### button element not found!")
    }
}