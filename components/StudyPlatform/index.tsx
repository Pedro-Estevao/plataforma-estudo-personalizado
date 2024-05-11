'use client';

import { useAppContext } from "@/contexts/appContext";
import interactionGemini from "@/lib/geminiClient";
import prompts from "@/lib/prompts";
import { Code } from "@nextui-org/code";
import { useCallback, useEffect, useState } from "react";

const StudyPlatform = () => {
    const { introduction, setIntroduction, personality, studyMaterial, modulos, setModulos } = useAppContext();
    const [modulesFetched, setModulesFetched] = useState('');

    const handleGetModules = useCallback(async (themeStudy: string) => {
        if (!themeStudy) return;
        
        try {
            const response = await interactionGemini(prompts.generateModules(themeStudy), personality);
            setModulesFetched(response.text());
        } catch (error) {
            console.error(error);
        } finally {
            // setModulesFetched('');
            setIntroduction({ ...introduction, isLoading: false });
            console.log(modulesFetched);
        }
    }, [introduction, personality, setIntroduction, modulesFetched]);

    useEffect(() => {
        if (studyMaterial && introduction.isLoading) {
            handleGetModules(studyMaterial);
        }
    }, [handleGetModules, introduction.isLoading, studyMaterial]);
    
    return (
        <div className="bg-white dark:bg-[#18181c]">
            <Code>{JSON.stringify(modulesFetched, null, 0)}</Code>
        </div>
    );
};

export default StudyPlatform;
