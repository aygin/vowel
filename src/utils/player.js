import { spawn } from "child_process";
import { TEST_AUDIO_PATH } from "../services/constants";

// spawn ffplay without a display window
export const playAudio = () => {
  spawn("ffplay", ["-nodisp", "-autoexit", TEST_AUDIO_PATH], {
    stdio: "ignore", // ignore ffplay logs
  });
  console.log("🎵 Starting playback now:", TEST_AUDIO_PATH);

  // player.on("exit", (code) => {
  //   console.log("✅ Playback finished:", file);
  // });
};
