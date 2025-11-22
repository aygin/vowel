import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const USB_SERIAL_PORT = `/dev/tty.usbserial-210`;
export const USB_BAUD_RATE = 115200;
export const VOWELS_LIST = ["a", "o"];
export const TEST_AUDIO_PATH = `${__dirname}/../assets/audio/voice_1.ogg`;
