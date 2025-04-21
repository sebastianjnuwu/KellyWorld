import client from "../../main";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Event } from "../../structures/Event";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_VIOLENCE,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SUICIDE,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_ABUSE,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SELF_HARM,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },

  {
    category: HarmCategory.HARM_CATEGORY_SPAM,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_FAKE_NEWS,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_PRIVACY_VIOLATION,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_OFFENSIVE_MEDIA,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_TERRORISM,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DISCRIMINATORY_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const conversationHistory = [];

export default new Event("messageCreate", async (message) => {
  if (!message.inGuild()) return;

  if (!message.content.startsWith("Kelly")) return;

  const message_user = message.content.replace("Kelly", "").trim();

  conversationHistory.push({
    role: "user",
    content: message_user,
  });

  const result = await model.generateContent(message_user, {
    safetySettings,
    conversationHistory,
  });

  let responseText = result.response?.text() || "";

  if (responseText.length > 2000) {
    responseText = `${responseText.slice(0, 1890)}...`;
  }

  conversationHistory.push({
    role: "assistant",
    content: responseText,
  });

  await message.channel.sendTyping();

  await message.reply(`${message.author} ${responseText}`);
});
