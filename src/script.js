import setting from "../setting.json" with { type: "json" };
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const generativeAI = new GoogleGenerativeAI(setting.API_KEY);

let username = prompt("Tolong masukan sebuah nama");
let password = prompt("Tolong masukan sebuah password yang telah terdaftar");

if (password !== setting.PASSWORD) {
    alert("Mohon maaf tapi password tersebut tidak terdaftar");
    window.location.href = "https://niaz.my.id"
} else {
    alert("Terima Kasih!")
}

const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "Hello, my name is " + username }],
        }
    ], // Start with an empty history
    generationConfig: {},
    maxOutputTokens: 500,
});

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
        const userText = $('<div>').text(prompt).addClass('bg-gray-300 text-gray-800 font-ibm-plex-sans rounded-lg px-4 py-2');
        userMessage.append(userAvatar, userText);
        $(".flex-col.overflow-y-auto.h-80.pb-4").append(userMessage);

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = await response.text();

        // reset input
        $("#question").val('');

        // AI-side
        const chatbotResponse = $('<div>').addClass('flex items-start py-2 px-4');
        const chatbotAvatar = $('<img>').attr({
            src: 'public/awa-subaru.png',
            alt: 'Subaru Awa',
            class: 'flex-shrink-0 mr-3 h-[50px] w-[50px] rounded-full'
        });

        const chatbotText = $('<div>').text(`${text}`).addClass('bg-blue-500 text-white font-ibm-plex-sans rounded-lg px-4 py-2');
        chatbotResponse.append(chatbotAvatar, chatbotText);
        $(".flex-col.overflow-y-auto.h-80.pb-4").append(chatbotResponse);

        $(".flex-col.overflow-y-auto.h-80.pb-4").scrollTop($(".flex-col.overflow-y-auto.h-80.pb-4").prop('scrollHeight'));

    }
});
