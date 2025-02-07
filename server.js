// server.js
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// API to handle sheet upload
app.post('/upload-sheet', upload.single('sheet'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    res.json({ message: 'Sheet processed successfully', data: sheetData });
});

// API to handle media upload
app.post('/upload-media', upload.array('media', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No media files uploaded' });
    }

    const fileNames = req.files.map(file => file.originalname);
    res.json({ message: 'Media uploaded successfully', files: fileNames });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});