import  "./styles.css";

const MOUTH_RESOLUTION = 9;

const renderSpanMouthElements = (applicationContainer) => {
    const mouthContainer = document.createElement("div");
    mouthContainer.classList.add('mouth-container');
    applicationContainer.appendChild(mouthContainer);
    for (let i = 0; i < MOUTH_RESOLUTION; i++) {
        const span = document.createElement("span");
        span.classList.add('mouth-span');
        mouthContainer.appendChild(span);
    }
}

window.onload = () => {
    const mainAppDiv = document.querySelector("div#application");
    if(mainAppDiv) {
        renderSpanMouthElements(mainAppDiv);
    } else {
        console.error("ERROR in finding element!");
    }
}