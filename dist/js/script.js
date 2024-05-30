import setting from "../../setting.json" with { type: "json" };
import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm';
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const generativeAI = new GoogleGenerativeAI(setting.API_KEY);
const md = new MarkdownIt();

const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [
                { text: "Hello, my name is Niaz" },
                { text: "How about from now on I will call you Subaru Awa?" }
            ],
        },
    ],
    generationConfig: {},
    maxOutputTokens: 500,
});

$("#submitButton").on("click", async (ev) => {
    ev.preventDefault();
    const prompt = $("#question").val();

    if (prompt.trim()) {
        // user-side
        const userMessage = $('<div>').addClass('flex items-end py-2 px-4')
        const userAvatar = $('<img>').attr({
            src: 'https://placehold.co/50x50',
            alt: 'Avatar Pengguna',
            class: 'flex-shrink-0 mr-3 rounded-full'
        });
        const userText = $('<div>').text(prompt).addClass('bg-gray-300 text-gray-800 font-ibm-plex-sans rounded-lg px-4 py-2');
        userMessage.append(userAvatar, userText);
        $(".flex-col.overflow-y-auto.h-80.pb-4").append(userMessage);

        // reset input
        $("#question").val('');

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = await response.text();

        // AI-side
        const chatbotResponse = $('<div>').addClass('flex items-start py-2 px-4');
        const chatbotAvatar = $('<img>').attr({
            src: 'public/awa-subaru.png',
            alt: 'Subaru Awa',
            class: 'flex-shrink-0 mr-3 h-[50px] w-[50px] rounded-full'
        });

        const chatbotText = $('<div>').html(md.render(text)).addClass('bg-blue-500 text-white font-ibm-plex-sans rounded-lg px-4 py-2');
        chatbotResponse.append(chatbotAvatar, chatbotText);
        $(".flex-col.overflow-y-auto.h-80.pb-4").append(chatbotResponse);
        $(".flex-col.overflow-y-auto.h-80.pb-4").scrollTop($(".flex-col.overflow-y-auto.h-80.pb-4").prop('scrollHeight'));
    }
});
