import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Event } from "../../structures/Event";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  safetySettings: []
});

const chat = model.startChat({ history: [] });

export default new Event("messageCreate", async (message) => {
  if (!message.inGuild()) return;
  if (!message.content.startsWith("Kelly")) return;

  const prompt = message.content.replace("Kelly", "").trim();
  await message.channel.sendTyping();

  const result = await chat.sendMessage(prompt);
  const responseText = result.response.text();

  const replyText =
    responseText.length > 2000
      ? `${responseText.slice(0, 1890)}...`
      : responseText;

  await message.reply(`${message.author} ${replyText}`);
});