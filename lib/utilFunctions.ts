import { ChatHistoryType, IntroductionType } from "@/@types/appContext";
import interactionGemini from "./geminiClient";
import prompts from "./prompts";

export const addHistoryChat = (
    history: ChatHistoryType[], 
    setHistory: (history: ChatHistoryType[]) => void,
    role: 'user' | 'model', 
    string: string,
) => {
    const newHistory: ChatHistoryType = {
        role: role,
        parts: [{ text: string }],
    };
    
    setHistory([ ...history, newHistory ]);
};

export const addStoriesChat = (
    history: ChatHistoryType[], 
    setHistory: (history: ChatHistoryType[]) => void,
    user: string,
    model: string,
) => {
    const newUserHistory: ChatHistoryType = {
        role: 'user',
        parts: [{ text: user }],
    };
    const newModelHistory: ChatHistoryType = {
        role: 'model',
        parts: [{ text: model }],
    };
    
    setHistory([...history, newUserHistory, newModelHistory]);
};

export const clearJSON = (json: string) => {
    return JSON.stringify(json, null, 2);
}

export const handleGetModules = async (
    themeStudy: string,
    personality: TeacherPersonality,
    generationHistory: ChatHistoryType[],
    setGenerationHistory: (history: ChatHistoryType[]) => void,
    introduction: IntroductionType,
    setIntroduction: (introduction: IntroductionType) => void,
) => {
    if (!themeStudy) return;

    let attempts = 0;
    while (attempts < 5) {
        try {
            const prompt = prompts.generateModules(themeStudy);
            const response = await interactionGemini(prompt, personality);
            addStoriesChat(generationHistory, setGenerationHistory, prompt, response.text());
            // setModulesFetched(response.text());
            // console.log(response);
            break;
        } catch (error) {
            console.error(error);
            attempts++;
        } finally {
            // setModulesFetched('');
            setIntroduction({ ...introduction, isLoading: false });
            // console.log(modulesFetched);
        }
    };
};