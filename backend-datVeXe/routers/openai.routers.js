const express = require("express");
const axios = require("axios");
require("dotenv").config();

const openaiRouter = express.Router();

const API_KEY = process.env.API_KEY;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

openaiRouter.post("/chat", async (req, res) => {
	try {
		// Lấy message từ body
		const {message} = req.body;

		const response = await axios.post(
			API_URL,
			{
				contents: [
					{
						parts: [
							{
								text: message,
							},
						],
					},
				],
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No reply";

		res.json({reply});
	} catch (error) {
		console.error("Gemini API error:", error.response?.data || error.message || error);
		res.status(500).json({
			error: error.response?.data?.error?.message || "Failed to get response from Gemini AI",
		});
	}
});

module.exports = {openaiRouter};
