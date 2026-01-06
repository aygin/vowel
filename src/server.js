import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the ui directory
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  console.log("#GOT request on" , req.baseUrl);
  res.sendFile(path.join(__dirname, '../ui/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
