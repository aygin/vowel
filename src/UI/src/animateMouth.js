import { MOUTH_ELEMENTS } from "./services/consts";

// export const animateMouth = () => {
//     // for (let i = 0; i < MOUTH_RESOLUTION; i++) {
//     //     const span = MOUTH_ELEMENTS[i];
//     //     const spanHeight = `${(gaussian(i) * 150).toFixed(2)}px`
//     //     span.style.height = spanHeight;
//     //     // console.log(`#### set span number ${i} height to ` , spanHeight)
//     // }

//     MOUTH_ELEMENTS.forEach((el) => {
//         el.classList.add('open');
//         el.addEventListener('animationend', () => {
//             el.classList.remove('open');
//         });
//     });
// }

const onAnimationEnd = (el) => {
    el.classList.remove('open');
    el.removeEventListener('animationend', onAnimationEnd);
};

export const animateMouth = () => {
    MOUTH_ELEMENTS.forEach((el) => {
        // Reset animation if already running
        el.classList.remove('open');
        el.removeEventListener('animationend', onAnimationEnd);

        // Force reflow to restart animation
        void el.offsetWidth;

        el.classList.add('open');
        el.addEventListener('animationend', () => onAnimationEnd(el));
    });
}