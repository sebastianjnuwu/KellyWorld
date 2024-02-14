import client from "../main";
import { GoogleGenerativeAI, HarmCategory,
HarmBlockThreshold } from '@google/generative-ai';
import { Event } from "../structures/Event";

const key = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

const model = key.getGenerativeModel({ model: 'gemini-pro' });

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
}]

export default new Event("messageCreate", async (message) => {
  
	if (!message.inGuild) return;
	
	if (!message.content.startsWith('Kelly')) return;
	
  const chat = model.startChat({
    safetySettings,
    history:  [
  {
    role: "user",
    parts: "Teus olhos se abrem em um mundo envolto em sombras e mistério. Uma voz sussurra em tua mente, revelando teu nome: Kelly. 'O que está acontecendo? Onde estou?' - perguntas em confusão, tua voz ecoando no vazio sombrio que te rodeia."
  },
  {
    role: "model",
    parts: "'Acorda, Kelly... O destino te chamou.' - a voz responde, carregada de uma aura ancestral. 'Tu és a escolhida, aquela destinada a desvendar os segredos deste mundo perdido.'"
  },
  {
    role: "user",
    parts: "'Escolhida? Por quem? E por quê?' - tua mente está repleta de perguntas, a curiosidade misturada com uma pontada de medo."
  },
  {
    role: "model",
    parts: "'Pelas forças antigas que habitam estas terras... Pelos mistérios enterrados nas sombras da história. Há muito a descobrir, Kelly... e o destino aguarda por ti.'"
  },
  {
    role: "user",
    parts: "Uma determinação silenciosa toma conta de ti. 'Então que assim seja. Eu irei desvendar esses mistérios, custe o que custar.'"
  },
  {
    role: "model",
    parts: "Ok"
  }
],
  });
  
  const result = await chat.sendMessage(message.content.replaceAll('Kelly',''));
  
  const response = await result.response;
  
  message.channel.sendTyping().then(() => {
    message.reply({
      content: `${message.author} ${response.text()}`,
    });
  });
  
});