// import dotenv from "dotenv" 
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

// dotenv.config()

const genAI = new GoogleGenerativeAI("HERE IT'S")
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

const userInput = $("#question")
const submitButton = $("#submitButton")
const chatHistory = $(".flex-col.overflow-y-auto.h-80.pb-4")

submitButton.on("click", async () => {
    const message = userInput.val()

    if (message.trim()) {
        const userMessage = $('<div>').addClass('flex items-end py-2 px-4')
        const userAvatar = $('<img>').attr({
            src: 'https://placehold.co/50x50',
            alt: 'Avatar Pengguna',
            class: 'flex-shrink-0 mr-3 rounded-full'
        })
        const userText = $('<div>').text(message).addClass('bg-gray-300 text-gray-800 font-ibm-plex-sans rounded-lg px-4 py-2')
        userMessage.append(userAvatar, userText)
        chatHistory.append(userMessage)

        userInput.val('')

        const chatbotResponse = $('<div>').addClass('flex items-start py-2 px-4')
        const chatbotAvatar = $('<img>').attr({
            src: 'awa-subaru.png',
            alt: 'Subaru Awa',
            class: 'flex-shrink-0 mr-3 rounded-full'
        })

        const result = await model.generateContent([message])

        const chatbotText = $('<div>').text(`${result.response.text()}`).addClass('bg-blue-500 text-white font-ibm-plex-sans rounded-lg px-4 py-2')
        chatbotResponse.append(chatbotAvatar, chatbotText)
        chatHistory.append(chatbotResponse)

        chatHistory.scrollTop(chatHistory.prop('scrollHeight'))
    }
})
