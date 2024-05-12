'use client';

import { useAppContext } from "@/contexts/appContext";
import { Code } from "@nextui-org/code";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import { Navbar } from "../Navbar";
import { cleanAndConvertPlanoEstudo, handleGetModule, handleGetModules } from "@/lib/utilFunctions";
import { Button } from "@nextui-org/button";
import IntroductionLoading from "../IntroductionLoading";
import Typed from "typed.js";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = (durationStart: number, durationEnd?: number) => ({
    initial: {
        opacity: 0,
        x: 0,
        transition: {
            duration: durationStart,
        }
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: 0,
        transition: {
            duration: durationEnd,
        }
    }
});

const pageTransition = (duration: number) => ({
    type: 'tween',
    ease: 'anticipate',
    duration,
});

const StudyPlatformLoading = () => {
    const studyPlatformLoadingEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const typed = new Typed(studyPlatformLoadingEl.current, {
            strings: ['Buscando informações...', 'Processando dados...', 'Dominando o mundo...', 'Carregando conteúdo...', 'Aguarde um momento...'],
            typeSpeed: 50,
            showCursor: false,
            loop: true,
            backSpeed: 50,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full min-h-[calc(100lvh-65px)]">
            <span className="loader">
                <span className="loader-inner" />
            </span>
            <span ref={studyPlatformLoadingEl} className="introLoading text-[16px] text-gray-800 text-center" />
        </div>
    )
};

const StudyPlatformInitial = () => {
    const { studyPlatform, setStudyPlatform, generationHistory, setGenerationHistory, personality } = useAppContext();
    
    return (
        <div className="flex flex-col items-center justify-center gap-20 w-full h-full min-h-[calc(100lvh-65px)]">
            <h2 className="text-[65px] text-[#438dff] font-semibold uppercase text-center">START!</h2>

            <div className="text-[16px] text-gray-800 font-semibold text-center">
                Vamos começar! Aperte o botão abaixo para acesar o primeiro módulo.
            </div>

            <Button
                className={`bg-[#68a2fe] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff]`}
                onClick={() => {
                    setStudyPlatform({ ...studyPlatform, isLoading: true });
                    handleGetModule(generationHistory, setGenerationHistory, personality, studyPlatform, setStudyPlatform);
                }}
            >
                Iniciar Aprendizado
            </Button>
        </div>
    )
}

const StudyPlatform = () => {
    const { introduction, setIntroduction, personality, studyMaterial, generationHistory, setGenerationHistory, studyPlatform, setStudyPlatform } = useAppContext();
    const [modulo, setModulo] = useState<number>(studyPlatform.actModule);

    useEffect(() => {
        if (studyMaterial && introduction.isLoading) {
            handleGetModules(studyMaterial, personality, generationHistory, setGenerationHistory, introduction, setIntroduction, studyPlatform, setStudyPlatform);
        }
    }, [generationHistory, introduction, personality, setGenerationHistory, setIntroduction, setStudyPlatform, studyMaterial, studyPlatform]);

    // useEffect(() => {
    //     if (studyPlatform.isLoading) {
    //         if (studyPlatform.modulos[studyPlatform.actModule].isOpen && studyPlatform.modulos[studyPlatform.actModule].content.length > 0) {
    //             setStudyPlatform(prevState => ({ ...prevState, isLoading: false }));
    //         }
    //     }
    // }, [setStudyPlatform, studyPlatform.actModule, studyPlatform.isLoading, studyPlatform.modulos]);

    return (
        <div className="relative min-h-[100lvh] bg-white dark:bg-[#18181c]">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key="study-platform-sidebar"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants(2)}
                    transition={pageTransition(2)}
                >
                    <Sidebar />
                </motion.div>

                <div className="min-h-[100lvh] lg:pl-[288px]">
                    <motion.div
                        key="study-platform-navbar"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants(2)}
                        transition={pageTransition(2)}
                    >
                        <Navbar />
                    </motion.div>

                    <motion.div
                        key="study-platform-content"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants(2, 1)}
                        transition={pageTransition(2)}
                        className="flex flex-col h-full min-h-[calc(100lvh-65px)]"
                    >
                        {studyPlatform.isLoading ? (
                            <StudyPlatformLoading />
                        ) : (studyPlatform.isGettingModels ? (
                            <StudyPlatformInitial />
                        ) : (
                            <main className="flex flex-col flex-grow flex-shrink-0 gap-y-8 h-full py-10">
                                <div className="flex flex-col flex-grow flex-shrink-0 px-4 sm:px-6 lg:px-8">
                                    {studyPlatform.modulos[studyPlatform.actModule] && studyPlatform.modulos[studyPlatform.actModule].content && studyPlatform.modulos[studyPlatform.actModule].content.map((item, index) => (
                                        <div
                                            key={`modulo-${studyPlatform.actModule}-content-${index}`}
                                            className="mb-8"
                                            dangerouslySetInnerHTML={{ __html: item.html }}
                                        >
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between gap-3 w-full px-12">
                                    <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants(2)}
                                        transition={pageTransition(2)}
                                    >
                                        <Button
                                            className={`bg-[#68a2fe] w-[143px] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff] ${modulo === 0 ? "invisible select-none" : "visible"}`}
                                            onClick={() => {
                                                setModulo(modulo - 1);
                                                setStudyPlatform(prevState => ({
                                                    ...prevState,
                                                    actModule: modulo - 1,
                                                    isLoading: true,
                                                }));
                                            }}
                                        >
                                            Anterior
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants(2)}
                                        transition={pageTransition(2)}
                                    >
                                        <Button
                                            className={`bg-[#68a2fe] w-[143px] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff] ${modulo === (studyPlatform.modulos.length - 1) ? "invisible select-none" : "visible"}`}
                                            // isDisabled={!introduction.pages[`page${page}` as keyof typeof introduction.pages].button}
                                            onClick={() => {
                                                if (modulo === (studyPlatform.modulos.length - 1)) {
                                                    setIntroduction(prevState => ({
                                                        ...prevState,
                                                        show: false,
                                                        isLoading: true,
                                                    }));
                                                    return;
                                                }

                                                const updatedModule = [...studyPlatform.modulos];
                                                updatedModule[modulo + 1] = {
                                                    ...updatedModule[modulo + 1],
                                                    isOpen: true,
                                                };

                                                setModulo(modulo + 1);
                                                setStudyPlatform(prevState => ({
                                                    ...prevState,
                                                    actModule: modulo + 1,
                                                    isLoading: true,
                                                    modulos: updatedModule,
                                                }));

                                                handleGetModule(generationHistory, setGenerationHistory, personality, studyPlatform, setStudyPlatform);
                                            }}
                                        >
                                            {modulo === (studyPlatform.modulos.length - 1) ? "Aprender" : "Próximo"}
                                        </Button>
                                    </motion.div>
                                </div>
                            </main>
                        ))}
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    );
};

export default StudyPlatform;
