import express from 'express';
import GeminiProvider from './geminiProvider.js';

const router = express.Router();

// sample chat route
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if(!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log(`Received message: ${message}`);

  try {
    const gemini = new GeminiProvider(
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_MODEL
    );

    const response = await gemini.generateResponse(message);
    console.log(`Generated response: ${response}`);

    res.json({ reply: response });
  } catch(error) {
    console.error("Error generating response from Gemini:", error);
    res.status(500).json({ error: "Failed to get a response from the AI." });
  }
});

export default router;
