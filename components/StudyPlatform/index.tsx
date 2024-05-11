'use client';

import { useAppContext } from "@/contexts/appContext";
import interactionGemini from "@/lib/geminiClient";
import prompts from "@/lib/prompts";
import { Code } from "@nextui-org/code";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Navbar } from "../Navbar";
import { addHistoryChat, handleGetModules } from "@/lib/utilFunctions";
import { Button } from "@nextui-org/button";
import { ChatHistoryType } from "@/@types/appContext";

const StudyPlatform = () => {
    const { introduction, setIntroduction, personality, studyMaterial, generationHistory, setGenerationHistory, modulos, setModulos } = useAppContext();
    const [modulesFetched, setModulesFetched] = useState('');

    useEffect(() => {
        if (studyMaterial && introduction.isLoading) {
            handleGetModules(studyMaterial, personality, generationHistory, setGenerationHistory, introduction, setIntroduction);
        }
    }, [generationHistory, introduction, introduction.isLoading, personality, setGenerationHistory, setIntroduction, studyMaterial]);

    return (
        <div className="bg-white dark:bg-[#18181c]">
            <Sidebar />

            <div className="lg:pl-[288px]">
                <Navbar />

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="relative h-[576px] overflow-hidden rounded-[0.75rem] border-[1px] border-dashed border-[#9ca3af] opacity-75">
                            <Code>{modulesFetched}</Code>
                            <Code>{JSON.stringify(modulesFetched, null, 2)}</Code>
                            {/* <Button
                                onClick={() => {
                                    const teste = ""
                                    addHistoryChat(generationHistory, setGenerationHistory, 'user', prompts.generateModules(studyMaterial));
                                }}
                            >
                                teste
                            </Button> */}
                            {/* <svg className="absolute inset-0 h-full w-full stroke-[#1118271a]" fill="none">
                                <defs>
                                    <pattern id="pattern-1526ac66-f54a-4681-8fb8-0859d412f251" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                                    </pattern>
                                </defs>
                                <rect stroke="none" fill="url(#pattern-1526ac66-f54a-4681-8fb8-0859d412f251)" width="100%" height="100%"></rect>
                            </svg> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudyPlatform;
