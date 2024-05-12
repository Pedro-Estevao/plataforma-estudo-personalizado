import { Dispatch, SetStateAction } from "react";

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

type ModuleType = {
    title: string;
    description: string;
    content: { html: string }[];
    isOpen: boolean;
    chatHistory: ChatHistoryType[];
};

type StudyPlatformType = {
    show: boolean;
    isGettingModels: boolean;
    isLoading: boolean;
    modulos: ModuleType[];
    actModule: number;
    setModulos: (modulos: ModuleType[]) => void;
};

type SetStudyPlatformType = Dispatch<SetStateAction<StudyPlatformType>>;

type SidebarType = {
    expanded: boolean;
};

type SetSidebarType = Dispatch<SetStateAction<SidebarType>>;

type ChatHistoryType = {
    role: 'user' | 'model';
    parts: { text: string }[];
};  