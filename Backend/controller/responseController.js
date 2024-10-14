import Groq from "groq-sdk";
import User from "../model/user.model.js"; // Assuming you're using Mongoose for User model
import dotenv from "dotenv";

dotenv.config();
// Initialize the Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Controller function to handle the query, send to Groq LLM, and save response
const sendQueryToGroqLLM = async (req, res) => {
  try {
    // Get userId and query from the request body
    const { userId, query } = req.body;

    // Ensure query is present
    if (!query) {
      return res.status(400).json({ message: "Query is required." });
    }

    // Send query to Groq LLM
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: query, // Send user query to Groq
        },
      ],
      model: "llama3-8b-8192", // Use appropriate Groq model
    });

    // Extract response from Groq LLM
    const responseText =
      chatCompletion.choices[0]?.message?.content || "No response";

    // Save the query and response to the user's chat history
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          chatHistory: { query, response: responseText },
        },
      },
      { new: true }
    );

    // Return the response to the client
    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error querying Groq LLM:", error.message);
    return res.status(500).json({ message: "Error processing the query." });
  }
};

export default sendQueryToGroqLLM;
