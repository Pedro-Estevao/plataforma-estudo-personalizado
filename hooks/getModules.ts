import { useCallback } from "react";
import { ChatHistoryType, IntroductionType, SetIntroductionType, SetStudyPlatformType, StudyPlatformType } from "@/@types/appContext";
import { addStoriesChat, cleanAndConvertPlanoEstudo, generateModule } from "@/lib/utilFunctions";
import prompts from "@/lib/prompts";
import interactionGemini from "@/lib/geminiClient";

export const useHandleGetModules = () => {
    return useCallback(async (
        themeStudy: string,
        personality: TeacherPersonality,
        generationHistory: ChatHistoryType[],
        setGenerationHistory: (history: ChatHistoryType[]) => void,
        introduction: IntroductionType,
        setIntroduction: SetIntroductionType,
        studyPlatform: StudyPlatformType,
        setStudyPlatform: SetStudyPlatformType,
    ) => {
        if (!themeStudy) return;

        let attempts = 0;
        while (attempts < 5) {
            try {
                const prompt = prompts.generateModules(themeStudy);
                const response = await interactionGemini(prompt, personality);
                addStoriesChat(generationHistory, setGenerationHistory, prompt, response.text());
                break;
            } catch (error) {
                console.error(error);
                attempts++;
            } finally {
                setIntroduction({ ...introduction, isLoading: false });
                setStudyPlatform({ ...studyPlatform, isGettingModels: true });
            }
        };
    }, []);
};

export const useHandleGetModule = () => {
    return useCallback(async (
        generationHistory: ChatHistoryType[],
        setGenerationHistory: (history: ChatHistoryType[]) => void,
        personality: TeacherPersonality,
        studyPlatform: StudyPlatformType,
        setStudyPlatform: SetStudyPlatformType,
    ) => {
        if (studyPlatform.modulos.length === 0) return;

        let attempts = 0;
        while (attempts < 5) {
            try {
                const prompt = prompts.generateModule(studyPlatform.modulos[studyPlatform.actModule]);
                const response = await interactionGemini(prompt, personality, generationHistory);
                generateModule(generationHistory, setGenerationHistory, prompt, response.text(), studyPlatform, setStudyPlatform);
                // addStoriesChat(generationHistory, setGenerationHistory, prompt, response.text());
                // const cleanedModule = cleanAndConvertPlanoEstudo(response.text());
                // const updatedModules = [...studyPlatform.modulos];
                // updatedModules[studyPlatform.actModule] = {
                //     ...updatedModules[studyPlatform.actModule],
                //     content: [
                //         ...updatedModules[studyPlatform.actModule].content,
                //         ...cleanedModule.content
                //     ]
                // };
                // setStudyPlatform({ 
                //     ...studyPlatform, 
                //     modulos: updatedModules
                // });
                break;
            } catch (error) {
                console.error(error);
                attempts++;
            } finally {
                setStudyPlatform({ ...studyPlatform, isLoading: false });
            }
        };
    }, []);
};