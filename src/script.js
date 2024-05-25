import setting frfom "../setting.json"
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const generativeAI = new GoogleGenerativeAI(setting.API_KEY);

$("#submitButton").on("click", async () => {
    const prompt = $("#question").val();

    if (prompt.trim()) {
        // user-side
        const userMessage = $('<div>').addClass('flex items-end py-2 px-4')
        const userAvatar = $('<img>').attr({
            src: 'https://placehold.co/50x50',
            alt: 'Avatar Pengguna',
            class: 'flex-shrink-0 mr-3 rounded-full'
        });
        const userText = $('<div>').text(message).addClass('bg-gray-300 text-gray-800 font-ibm-plex-sans rounded-lg px-4 py-2');
        userMessage.append(userAvatar, userText);
        chatHistory.append(userMessage);

        run()
        console.log(respond(prompt))
        

        // reset input
        $("#question").val('');

        // AI-side
        const chatbotResponse = $('<div>').addClass('flex items-start py-2 px-4');
        const chatbotAvatar = $('<img>').attr({
            src: 'awa-subaru.png',
            alt: 'Subaru Awa',
            class: 'flex-shrink-0 mr-3 rounded-full'
        });

        const chatbotText = $('<div>').text(`${result.response.text()}`).addClass('bg-blue-500 text-white font-ibm-plex-sans rounded-lg px-4 py-2');
        chatbotResponse.append(chatbotAvatar, chatbotText);
        chatHistory.append(chatbotResponse);

        chatHistory.scrollTop(chatHistory.prop('scrollHeight'))

    }
});

const run = async () => {
    const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
    history: [], // Start with an empty history
    generationConfig: {
    },
    maxOutputTokens: 500,
  });
}

async function respond(msg) {
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = await response.text();
    return text
    askAndRespond();
}
