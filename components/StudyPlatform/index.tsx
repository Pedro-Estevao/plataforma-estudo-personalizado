'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "@/contexts/appContext";
import Sidebar from "../Sidebar";
import { Navbar } from "../Navbar";
import { addStoriesChat, generateModule, generateModules, resetContext } from "@/lib/utilFunctions";
import { Button } from "@nextui-org/button";
import Typed from "typed.js";
import { AnimatePresence, motion } from "framer-motion";
import prompts from "@/lib/prompts";
import interactionGemini from "@/lib/geminiClient";
import { ModuleContentType } from "@/@types/appContext";
import { BadgeFill } from "../Icons";

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
        <div className={`flex flex-col items-center justify-center gap-4 w-full h-full min-h-[calc(100lvh-65px)] z-30`}>
            <span className="loader">
                <span className="loader-inner" />
            </span>
            <span ref={studyPlatformLoadingEl} className="introLoading text-[16px] text-gray-800 text-center min-h-[24px]" />
        </div>
    )
};

const StudyPlatformInitial = ({ handleGetModule }: { handleGetModule: () => Promise<void> }) => {
    const { setStudyPlatform } = useAppContext();

    return (
        <div className={`flex flex-col items-center justify-center gap-20 w-full h-full min-h-[calc(100lvh-65px)] z-20`}>
            <h2 className="text-[65px] text-[#438dff] font-semibold uppercase text-center">START!</h2>

            <div className="text-[16px] text-gray-800 dark:text-[#9ca3af] font-semibold text-center">
                Vamos começar! Aperte o botão abaixo para acesar o primeiro módulo.
            </div>

            <Button
                className={`bg-[#68a2fe] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff]`}
                onClick={() => {
                    handleGetModule();
                    setStudyPlatform(prevState => ({
                        ...prevState,
                        isGettingModels: false,
                        isGettingModulo: true,
                        isLoading: true,
                    }));
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
    const [actualModuleRes, setActualModuleRes] = useState<string>("");
    const [timeModule, setTimeModule] = useState<boolean>(false);

    const handleGetModules = useCallback(async () => {
        if (!studyMaterial) return;

        let attempts = 0;
        while (attempts < 5) {
            try {
                const prompt = prompts.generateModules(studyMaterial);
                const response = await interactionGemini(prompt, personality);
                addStoriesChat(generationHistory, setGenerationHistory, prompt, response.text());
                setActualModuleRes(response.text());
                break;
            } catch (error) {
                console.error(error);
                attempts++;
            } finally {
                setIntroduction({ ...introduction, isLoading: false });
                setStudyPlatform({ ...studyPlatform, isGettingModels: true });
            }
        };
    }, [generationHistory, introduction, personality, setGenerationHistory, setIntroduction, setStudyPlatform, studyMaterial, studyPlatform]);

    const handleGetModule = useCallback(async () => {
        if (studyPlatform.modulos.length === 0) return;

        let attempts = 0;
        while (attempts < 5) {
            try {
                const prompt = prompts.generateModule(studyPlatform.modulos[studyPlatform.actModule]);
                const response = await interactionGemini(prompt, personality, generationHistory);
                generateModule(response.text(), studyPlatform, setStudyPlatform);
                break;
            } catch (error) {
                console.error(error);
                attempts++;
            } finally {
                setStudyPlatform(prevState => ({
                    ...prevState,
                    isLoading: false,
                    isGettingModulo: false,
                }));
            }
        };
    }, [generationHistory, personality, setStudyPlatform, studyPlatform]);

    useEffect(() => {
        if (introduction.isLoading) {
            handleGetModules();
        }
    }, [handleGetModules, introduction.isLoading]);

    useEffect(() => {
        if (studyPlatform.isGettingModels && studyPlatform.show === false) {
            generateModules(actualModuleRes, studyPlatform, setStudyPlatform);
        }
    }, [actualModuleRes, generationHistory, setStudyPlatform, studyPlatform]);

    useEffect(() => {
        if (!studyPlatform.isGettingModulo && !studyPlatform.isLoading) {
            setTimeout(() => {
                setTimeModule(true);
            }, 5000);
        }
    }, [studyPlatform.isGettingModulo, studyPlatform.isLoading]);

    useEffect(() => {
        if (studyPlatform.actModule > modulo) {
            if (studyPlatform.modulos[studyPlatform.actModule].isOpen === false) {
                handleGetModule();
            }

            if (studyPlatform.modulos[studyPlatform.actModule] && studyPlatform.modulos[studyPlatform.actModule].content) {
                setModulo(studyPlatform.actModule);

                if (studyPlatform.modulos[studyPlatform.actModule].isOpen === true) {
                    setStudyPlatform(prevState => ({ ...prevState, isLoading: false, isGettingModulo: false }));
                }
            }
        } else if (studyPlatform.actModule < modulo) {
            if (studyPlatform.modulos[studyPlatform.actModule] && studyPlatform.modulos[studyPlatform.actModule].content) {
                setModulo(studyPlatform.actModule);
                setStudyPlatform(prevState => ({ ...prevState, isLoading: false, isGettingModulo: false }));
            }
        }
    }, [handleGetModule, modulo, setStudyPlatform, studyPlatform.actModule, studyPlatform.modulos]);

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
                    className="relative z-50"
                >
                    <Sidebar />
                
                    <div className="min-h-[100lvh] lg:pl-[288px]">
                        <Navbar />

                        <motion.div
                            key="study-platform-content"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants(2, 1)}
                            transition={pageTransition(2)}
                            className="relative flex flex-col h-full min-h-[calc(100lvh-65px)]"
                        >
                            {studyPlatform.isLoading ? (
                                <StudyPlatformLoading />
                            ) : (studyPlatform.isGettingModels ? (
                                <StudyPlatformInitial handleGetModule={handleGetModule} />
                            ) : (
                                <main className={`flex flex-col flex-grow flex-shrink-0 gap-y-8 h-full py-10 z-10`}>
                                    <div className="studyPlatform-content flex flex-col flex-grow flex-shrink-0 px-4 sm:px-6 lg:px-8">
                                        {studyPlatform.modulos[studyPlatform.actModule] && studyPlatform.modulos[studyPlatform.actModule].content && studyPlatform.modulos[studyPlatform.actModule].content.map((item, index) => {
                                            const key = `modulo-${studyPlatform.actModule}-content-${index}`;
                                            const htmlContent = item.html;
                                            const hasTags = ['<!DOCTYPE>', '<!DOCTYPE html>', 'html', 'thead', 'body'].every(tag => htmlContent.includes(tag));

                                            if (hasTags) {
                                                return (
                                                    <iframe
                                                        key={key}
                                                        srcDoc={htmlContent}
                                                        title={key}
                                                        className="mb-8"
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <div
                                                        key={key}
                                                        className="mb-8"
                                                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                                                    />
                                                );
                                            }
                                        })}

                                    </div>

                                    <div className="flex items-center justify-between gap-3 w-full px-12 max-450:flex-col max-450:gap-y-6">
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
                                                    setStudyPlatform(prevState => ({
                                                        ...prevState,
                                                        actModule: prevState.actModule - 1,
                                                        isGettingModulo: true,
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
                                                className={`bg-[#68a2fe] min-w-[143px] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff] transition-all`}
                                                isDisabled={!timeModule}
                                                onClick={() => {
                                                    if (modulo === (studyPlatform.modulos.length - 1)) {
                                                        resetContext(setIntroduction, setStudyPlatform);
                                                        return;
                                                    }

                                                    setStudyPlatform(prevState => ({
                                                        ...prevState,
                                                        actModule: prevState.actModule + 1,
                                                        isGettingModulo: true,
                                                        isLoading: true,
                                                    }));
                                                }}
                                            >
                                                {modulo === (studyPlatform.modulos.length - 1) ? (
                                                    <>
                                                        <BadgeFill className="transition-all" size={24} />
                                                        Próximo Tema
                                                    </>
                                                ) : "Próximo"}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </main>
                            ))}

                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StudyPlatform;
