import express from 'express';
import path from 'path';
import { addPhonetics } from "./utils/detect-vowels";
import { voice_3_transcript } from "./services/test-transcript";
import { decodeAudioData } from "./utils/decode-audio";

const app = express();
const port = 3000;

// Serve static files from the ui directory
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  console.log("#GOT request on" , req.baseUrl);
  res.sendFile(path.join(__dirname, '../ui/index.html'));
});

app.post('/transcribe' , async (req , res) => {
  const {headers} = req;
  console.log("we got a transcribe request!" , headers['content-language']);
  try {
    const transcriptWithPhonetics = await addPhonetics(voice_3_transcript);
    const modifiedAudioData = await decodeAudioData(transcriptWithPhonetics);
    res.send({
      status: 200,
      audioData: modifiedAudioData,
    });
  } catch(error) {
    res.status(500).send({
      message: "internal error in transcription",
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
