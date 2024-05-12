import { ChatHistoryType, IntroductionType, ModuleType, SetStudyPlatformType, StudyPlatformType } from "@/@types/appContext";
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

    setHistory([...history, newHistory]);
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

export const cleanAndConvertPlanoEstudo = (planoEstudoString: string) => {
    const jsonStart = planoEstudoString.indexOf('[');
    const jsonEnd = planoEstudoString.lastIndexOf(']');
    const cleanedString = planoEstudoString.slice(jsonStart, jsonEnd + 1);
    const planoEstudo = JSON.parse(cleanedString);

    return planoEstudo;
}

const addPropertiesToModules = (modules: any[]): ModuleType[] => {
    return modules.map(module => ({
        ...module,
        content: [],
        isOpen: false,
        chatHistory: [],
    }));
}

export const generateModules = (
    history: ChatHistoryType[],
    setHistory: (history: ChatHistoryType[]) => void,
    user: string,
    model: string,
    studyPlatform: StudyPlatformType,
    setStudyPlatform: (studyPlatform: StudyPlatformType) => void,
) => {
    addStoriesChat(history, setHistory, user, model);
    const cleanedModules = cleanAndConvertPlanoEstudo(model);
    const newModules = addPropertiesToModules(cleanedModules);
    setStudyPlatform({
        ...studyPlatform,
        modulos: [
            ...studyPlatform.modulos,
            ...newModules
        ]
    });
};

export const generateModule = (
    history: ChatHistoryType[],
    setHistory: (history: ChatHistoryType[]) => void,
    user: string,
    model: string,
    studyPlatform: StudyPlatformType,
    setStudyPlatform: (studyPlatform: StudyPlatformType) => void,
) => {
    addStoriesChat(history, setHistory, user, model);
    const cleanedModule = cleanAndConvertPlanoEstudo(model);

    // const updatedModules = studyPlatform.modulos[studyPlatform.actModule].content.concat(cleanedModule.content);
    const updatedModules = [...studyPlatform.modulos];
    updatedModules[studyPlatform.actModule] = {
        ...updatedModules[studyPlatform.actModule],
        content: [
            ...updatedModules[studyPlatform.actModule].content,
            ...cleanedModule.content
        ]
    };

    setStudyPlatform({ 
        ...studyPlatform, 
        modulos: updatedModules
    });
};

export const handleGetModule = async (
    generationHistory: ChatHistoryType[],
    setGenerationHistory: (history: ChatHistoryType[]) => void,
    personality: TeacherPersonality,
    studyPlatform: StudyPlatformType,
    setStudyPlatform: SetStudyPlatformType,
) => {
    if (generationHistory.length === 0) return;

    let attempts = 0;
    while (attempts < 5) {
        try {
            const prompt = prompts.generateModule(studyPlatform.modulos[studyPlatform.actModule]);
            const response = await interactionGemini(prompt, personality, generationHistory);
            generateModule(generationHistory, setGenerationHistory, prompt, response.text(), studyPlatform, setStudyPlatform);
            break;
        } catch (error) {
            console.error(error);
            attempts++;
        } finally {
            setStudyPlatform({ ...studyPlatform, isLoading: false });
        }
    };
}

export const handleGetModules = async (
    themeStudy: string,
    personality: TeacherPersonality,
    generationHistory: ChatHistoryType[],
    setGenerationHistory: (history: ChatHistoryType[]) => void,
    introduction: IntroductionType,
    setIntroduction: (introduction: IntroductionType) => void,
    studyPlatform: StudyPlatformType,
    setStudyPlatform: (studyPlatform: StudyPlatformType) => void,
) => {
    if (!themeStudy) return;

    let attempts = 0;
    while (attempts < 5) {
        try {
            const prompt = prompts.generateModules(themeStudy);
            const response = await interactionGemini(prompt, personality);
            generateModules(generationHistory, setGenerationHistory, prompt, response.text(), studyPlatform, setStudyPlatform);
            break;
        } catch (error) {
            console.error(error);
            attempts++;
        } finally {
            setIntroduction({ ...introduction, isLoading: false });
            setStudyPlatform({ ...studyPlatform, show: true, isGettingModels: true});
        }
    };
};