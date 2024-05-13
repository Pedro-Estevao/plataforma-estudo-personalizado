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

type ModuleContentType = {
    html: string;
};

type ModuleType = {
    title: string;
    description: string;
    content: ModuleContentType[];
    isOpen: boolean;
    chatHistory: ChatHistoryType[];
};

type StudyPlatformType = {
    show: boolean;
    isGettingModels: boolean;
    isGettingModulo: boolean;
    isLoading: boolean;
    actModule: number;
    modulos: ModuleType[];
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