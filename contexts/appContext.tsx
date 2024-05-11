'use client';

import React, { createContext, useState, ReactNode, useContext, useEffect, Dispatch, SetStateAction } from 'react';

type PageType = {
    input: boolean;
    button: boolean;
    visited: boolean;
};

type PagesType = {
    [key: string]: PageType;
};

type IntroductionType = {
    show: boolean;
    isLoading: boolean;
    actPage: number;
    pages: PagesType;
};

type SetIntroductionType = Dispatch<SetStateAction<IntroductionType>>;

type ChatHistoryType = {
    role: 'user' | 'model';
    parts: string[];
};  

type ModuleType = {
    title: string;
    html: string;
    isOpen: boolean;
    chatHistory: ChatHistoryType[];
};

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
    userName: '',
    setUserName: (userName: string) => {},
    personality: '' as TeacherPersonality,
    setPersonality: (personality: TeacherPersonality) => {},
    studyMaterial: '',
    setStudyMaterial: (studyMaterial: string) => {},
    modulos: [] as ModuleType[],
    setModulos: (modulos: ModuleType[]) => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [introduction, setIntroduction] = useState<IntroductionType>(() => {
        const localData = localStorage.getItem('introduction');
        return localData ? JSON.parse(localData) : { show: true, isLoading: false, actPage: 1, pages: { page1: { input: false, button: false, visited: false }, page2: { input: false, button: false, visited: false }, page3: { input: false, button: false, visited: false } } };
    });
    const [userName, setUserName] = useState<string>(() => {
        const localData = localStorage.getItem('userName');
        return localData ? JSON.parse(localData) : '';
    });
    const [personality, setPersonality] = useState<TeacherPersonality>(() => {
        const localData = localStorage.getItem('personality');
        return localData ? JSON.parse(localData) : '';
    });
    const [studyMaterial, setStudyMaterial] = useState<string>(() => {
        const localData = localStorage.getItem('studyMaterial');
        return localData ? JSON.parse(localData) : '';
    });
    const [modulos, setModulos] = useState<ModuleType[]>(() => {
        const localData = localStorage.getItem('modulos');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('introduction', JSON.stringify(introduction));
    }, [introduction]);

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
        localStorage.setItem('modulos', JSON.stringify(modulos));
    }, [modulos]);
    
    return (
        <AppContext.Provider 
            value={{
                introduction,
                setIntroduction,
                userName,   
                setUserName,
                personality,
                setPersonality,
                studyMaterial,
                setStudyMaterial,
                modulos,
                setModulos,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);