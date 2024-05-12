'use client';

import { ChatHistoryType, IntroductionType, ModuleType, PagesType, SetIntroductionType, SetSidebarType, SetStudyPlatformType, SidebarType, StudyPlatformType } from "@/@types/appContext";
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

const AppContext = createContext({
    introduction: {
        show: true,
        isLoading: false,
        actPage: 1,
        pages: {
            page1: {
                input: false,
                button: false,
                visited: false,
            },
            page2: {
                input: false,
                button: false,
                visited: false,
            },
            page3: {
                input: false,
                button: false,
                visited: false,
            },
        } as PagesType,
    },
    setIntroduction: (() => {}) as SetIntroductionType,
    studyPlatform: {
        show: false,
        isGettingModels: false,
        isLoading: false,
        actModule: 0,
        modulos: [] as ModuleType[],
        setModulos: (modulos: ModuleType[]) => {},
    },
    setStudyPlatform: (() => {}) as SetStudyPlatformType,
    userName: '',
    setUserName: (userName: string) => {},
    personality: '' as TeacherPersonality,
    setPersonality: (personality: TeacherPersonality) => {},
    studyMaterial: '',
    setStudyMaterial: (studyMaterial: string) => {},
    generationHistory: [] as ChatHistoryType[],
    setGenerationHistory: (generationHistory: ChatHistoryType[]) => {},
    sidebar: {
        expanded: false,
    },
    setSidebar: (() => {}) as SetSidebarType,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [introduction, setIntroduction] = useState<IntroductionType>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('introduction');
        }
        return localData ? JSON.parse(localData) : { show: true, isLoading: false, actPage: 1, pages: { page1: { input: false, button: false, visited: false }, page2: { input: false, button: false, visited: false }, page3: { input: false, button: false, visited: false } } };
    });
    const [studyPlatform, setStudyPlatform] = useState<StudyPlatformType>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('studyPlatform');
        }
        return localData ? JSON.parse(localData) : { show: false, isGettingModels: false, isLoading: false, actModule: 0, modulos: [], setModulos: (modulos: ModuleType[]) => {} };
    });
    const [userName, setUserName] = useState<string>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('userName');
        }
        return localData ? JSON.parse(localData) : '';
    });
    const [personality, setPersonality] = useState<TeacherPersonality>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('personality');
        }
        return localData ? JSON.parse(localData) : '';
    });
    const [studyMaterial, setStudyMaterial] = useState<string>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('studyMaterial');
        }
        return localData ? JSON.parse(localData) : '';
    });
    const [generationHistory, setGenerationHistory] = useState<ChatHistoryType[]>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('generationHistory');
        }
        return localData ? JSON.parse(localData) : [];
    });
    const [sidebar, setSidebar] = useState<SidebarType>(() => {
        let localData = null;
        if (typeof window !== 'undefined') {
            localData = localStorage.getItem('sidebar');
        }
        return localData ? JSON.parse(localData) : { expanded: false };
    });

    useEffect(() => {
        localStorage.setItem('introduction', JSON.stringify(introduction));
    }, [introduction]);

    useEffect(() => {
        localStorage.setItem('studyPlatform', JSON.stringify(studyPlatform));
    }, [studyPlatform]);

    useEffect(() => {
        localStorage.setItem('userName', JSON.stringify(userName));
    }, [userName]);

    useEffect(() => {
        localStorage.setItem('personality', JSON.stringify(personality));
    }, [personality]);

    useEffect(() => {
        localStorage.setItem('studyMaterial', JSON.stringify(studyMaterial));
    }, [studyMaterial]);

    useEffect(() => {
        localStorage.setItem('generationHistory', JSON.stringify(generationHistory));
    }, [generationHistory]);

    useEffect(() => {
        localStorage.setItem('sidebar', JSON.stringify(sidebar));
    }, [sidebar]);
    
    return (
        <AppContext.Provider 
            value={{
                introduction,
                setIntroduction,
                studyPlatform,
                setStudyPlatform,
                userName,   
                setUserName,
                personality,
                setPersonality,
                studyMaterial,
                setStudyMaterial,
                generationHistory,
                setGenerationHistory,
                sidebar,
                setSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);