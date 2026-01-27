import  "./styles.css";

const MOUTH_RESOLUTION = 21;

const GAUSSIAN_CENTER = Math.floor(MOUTH_RESOLUTION / 2);

const renderedSpanEls = [];

const renderSpanMouthElements = (applicationContainer) => {
    const mouthContainer = document.createElement("div");
    mouthContainer.classList.add('mouth-container');
    applicationContainer.appendChild(mouthContainer);
    for (let i = 0; i < MOUTH_RESOLUTION; i++) {
            const span = document.createElement("span");
            span.classList.add('mouth-span');
            span.setAttribute('data-id' , `${i}`);
            renderedSpanEls.push(span);
            mouthContainer.appendChild(span);
            // const spanHeight = `${(gaussian(i) * 150).toFixed(2)}px`
            // span.style.height = spanHeight;
            // console.log("#### set span height to " , spanHeight)
        }
    setTimeout(() => {
        for (let i = 0; i < MOUTH_RESOLUTION; i++) {
            const span = renderedSpanEls[i];
            const spanHeight = `${(gaussian(i) * 150).toFixed(2)}px`
            span.style.height = spanHeight;
            console.log(`#### set span number ${i} height to ` , spanHeight)
        }
    } , 2000);
}

/**
 * Gaussian Bell Curve Function
 * @param {number} x - The input coordinate
 * @param {number} center - The mean (peak location), defaults to 0
 * @param {number} sigma - The standard deviation (width), defaults to 1
 * @returns {number} The height (y) at position x
 */
const gaussian = (x, center = GAUSSIAN_CENTER, sigma = 4) => {
  const exponent = -0.5 * Math.pow((x - center) / sigma, 2);
  return Math.exp(exponent);  // Peak will be 1 at x = center
}

window.onload = () => {
    const mainAppDiv = document.querySelector("div#application");
    if(mainAppDiv) {
        renderSpanMouthElements(mainAppDiv);
    } else {
        console.error("ERROR in finding element!");
    }
}