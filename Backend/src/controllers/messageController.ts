import { Request, Response } from "express";
import Together from "together-ai";
import dotenv from "dotenv";

dotenv.config();

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY, 
});

export const generatePersonalizedMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, jobTitle, company, location, summary } = req.body;

    if (!name || !jobTitle || !company || !location || !summary) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const prompt = `Generate a professional outreach message for ${name}, who is a ${jobTitle} at ${company} in ${location}. Their profile summary: ${summary}.`;

    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });

    const message = response.choices?.[0]?.message?.content || "Message generation failed.";

    res.json({ message });
  } catch (error) {
    console.error("Error generating message:", error);
    res.status(500).json({ error: "Failed to generate personalized message" });
  }
};
