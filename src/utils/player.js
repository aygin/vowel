import { spawn } from "child_process";
import { TEST_AUDIO_PATH } from "../services/constants";

// spawn ffplay without a display window
export const playAudio = () => {
  return new Promise((resolve) => {
    const player = spawn("ffplay", ["-nodisp", "-autoexit", TEST_AUDIO_PATH], {
      stdio: "inherit", // ignore ffplay logs
    });
    
    player.on("spawn" , () => {
      console.log("🎵 Starting playback now:", TEST_AUDIO_PATH);
      resolve();
    })
  
    player.on("exit", (code) => {
      console.log("✅ Playback finished:", code);
    });
  
    player.on("error", (err) => {
      console.error("Spawn failed:", err.message);
    });
  })
};
