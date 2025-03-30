const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // parse pdf
    const data = await pdfParse(req.file.buffer);
    const extractedText = data.text;

    //hugging face ai NER model
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english',
      {
        inputs: extractedText,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );

    // ai return skills
    const skills = response.data;
    console.log('Extracted Skills:', skills);

    // return extrated skills to website
    res.json({ extractedText, extractedSkills: skills });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'An error occurred while processing the file' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
