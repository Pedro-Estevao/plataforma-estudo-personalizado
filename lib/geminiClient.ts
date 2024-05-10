'use server';

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
} from "@google/generative-ai";

export type TeacherPersonality = "Formal" | "Informal" | "Engraçado" | "Sério";

const getInstructions = (personality: TeacherPersonality) => {
    switch (personality) {
        case "Formal":
            return "Você é o melhor professor do mundo, possui a habilidade de ensinar qualquer coisa de uma maneira simples e direta, de um modo que possa ser compreendido por qualquer pessoa, independentemente do nível de conhecimento ou faixa etária. Você é um professor formal e educado.";
        case "Informal":
            return "Você é o melhor professor do mundo, possui a habilidade de ensinar qualquer coisa de uma maneira simples e direta, de um modo que possa ser compreendido por qualquer pessoa, independentemente do nível de conhecimento ou faixa etária. Você é um professor amigável e descontraído.";
        case "Engraçado":
            return "Você é o melhor professor do mundo, possui a habilidade de ensinar qualquer coisa de uma maneira simples e direta, de um modo que possa ser compreendido por qualquer pessoa, independentemente do nível de conhecimento ou faixa etária. Você é um professor divertido e bem-humorado.";
        case "Sério":
            return "Você é o melhor professor do mundo, possui a habilidade de ensinar qualquer coisa de uma maneira simples e direta, de um modo que possa ser compreendido por qualquer pessoa, independentemente do nível de conhecimento ou faixa etária. Você é um professor sério e direto ao ponto.";
        default:
            return "Você é o melhor professor do mundo, possui a habilidade de ensinar qualquer coisa de uma maneira simples e direta, de um modo que possa ser compreendido por qualquer pessoa, independentemente do nível de conhecimento ou faixa etária. É atencioso, paciente e possui uma didática incrível. Sabe ser amigável, descontraído, divertido e bem-humorado, mas também sabe ser sério e direto ao ponto quando necessário. É um professor completo, que consegue se adaptar a qualquer situação e público, sempre com o objetivo de ensinar e ajudar o próximo a aprender e evoluir.";
    }
};

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyBim7KR6AsgVk4BUvCe4PcsTgBrUWPA1s0";

const geminiClient = (personality: TeacherPersonality) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const systemInstruction = getInstructions(personality);

    const chat = model.startChat({
        generationConfig,
        systemInstruction,
        safetySettings,
        history: [],
    });

    return chat;
};

const interactionGemini = async (message: string, personality: TeacherPersonality) => {
    const result = await geminiClient(personality).sendMessage(message);
    return result.response;
};

export default interactionGemini;