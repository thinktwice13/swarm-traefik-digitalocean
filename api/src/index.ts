import express from 'express';

const app = express();

app.listen(4001, () => {
  console.log('API server runing on port 4001.');
});
