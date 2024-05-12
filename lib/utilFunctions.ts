import { ChatHistoryType, IntroductionType, ModuleType, SetIntroductionType, SetStudyPlatformType, StudyPlatformType } from "@/@types/appContext";

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

export const addPropertiesToModules = (modules: any[]): ModuleType[] => {
    return modules.map(module => ({
        ...module,
        content: [],
        isOpen: false,
        chatHistory: [],
    }));
}

export const generateModules = (
    model: string,
    studyPlatform: StudyPlatformType,
    setStudyPlatform: SetStudyPlatformType,
) => {
    const cleanedModules = cleanAndConvertPlanoEstudo(model);
    const newModules = addPropertiesToModules(cleanedModules);
    setStudyPlatform({
        ...studyPlatform,
        show: true,
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
    setStudyPlatform: SetStudyPlatformType,
) => {
    addStoriesChat(history, setHistory, user, model);
    const cleanedModule = cleanAndConvertPlanoEstudo(model);
    console.log(cleanedModule);
    const updatedModules = [...studyPlatform.modulos];
    console.log(updatedModules);
    updatedModules[studyPlatform.actModule] = {
        ...updatedModules[studyPlatform.actModule],
        isOpen: true,
        content: [
            ...updatedModules[studyPlatform.actModule].content,
            ...cleanedModule
        ]
    };

    setStudyPlatform({ 
        ...studyPlatform, 
        modulos: updatedModules
    });
    // setStudyPlatform(prevState => ({
    //     ...prevState,
    //     modulos: prevState.modulos.map((module, index) => {
    //         if (index === prevState.actModule) {
    //             return {
    //                 ...module,
    //                 content: [
    //                     ...module.content,
    //                     ...cleanedModule.content
    //                 ]
    //             }
    //         }
    //         return module;
    //     })
    // }))
};
