'use client';

import React, { useRef, useState } from "react";
import { useAppContext } from "@/contexts/appContext";
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@nextui-org/button";
import Typed from "typed.js";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { cn } from "@nextui-org/system";
import { Code } from "@nextui-org/code";
import { TeacherPersonality } from "@/lib/geminiClient";

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

const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg p-0 border-2 border-transparent",
                    "data-[selected=true]:bg-content2 rounded-[8px] overflow-hidden"
                ),
                control: cn(
                    "p-0 m-0"
                ),
                label: cn(
                    "p-0 m-0"
                ),
                labelWrapper: cn(
                    "p-0 m-0"
                ),
                wrapper: cn(
                    "absolute top-[5px] left-[5px] z-10"
                ),
            }}
        >
            {children}
        </Radio>
    )
}

const Introduction = () => {
    const { introduction, setIntroduction, userName, setUserName, personality, setPersonality, studyMaterial, setStudyMaterial } = useAppContext();
    const [page, setPage] = useState<number>(introduction.actPage);
    const page1El = useRef(null);
    const page2El = useRef(null);
    const page3El = useRef(null);

    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 h-[100lvh] w-[100lvw] flex flex-col items-center justify-between gap-12 overflow-y-auto p-10 z-[999] max-sm:px-3`}>
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key="introduction-logo"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants(2)}
                    transition={pageTransition(2)}
                >
                    <Image src={'/imgs/gemini-logo.png'} className="select-none" width={300} height={150} alt="Logo Gemini" />
                </motion.div>

                {page === 1 && (
                    <motion.div
                        key="page1"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants(2, 1)}
                        transition={pageTransition(2)}
                        onAnimationStart={() => {
                            if (introduction.pages.page1.visited && userName) {
                                if (userName.length < 3) {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page1: {
                                                ...prevState.pages.page1,
                                                button: false,
                                            },
                                        },
                                    }));

                                    return;
                                }

                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page1: {
                                            input: true,
                                            button: true,
                                            visited: true,
                                        },
                                    },
                                }));
                            } else if (!introduction.pages.page1.visited && !userName) {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page1: {
                                            ...prevState.pages.page1,
                                            input: false,
                                        },
                                    },
                                }));
                            } else {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page1: {
                                            ...prevState.pages.page1,
                                            input: false,
                                        },
                                    },
                                }));
                            }
                        }}
                        onAnimationComplete={() => {
                            if (introduction.pages.page1.visited) return;

                            new Typed(page1El.current, {
                                strings: ['Sou Gemini, e serei seu professor durante sua jornada de aprendizado. <br/>Estou aqui para te ajudar. Mas antes, como posso te chamar?'],
                                typeSpeed: 0, //25
                                startDelay: 500,
                                showCursor: false,
                                onComplete: () => {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page1: {
                                                ...prevState.pages.page1,
                                                input: true,
                                            },
                                        },
                                    }));
                                }
                            });
                        }}
                        className="flex flex-col items-center justify-between gap-5 w-full"
                    >
                        <h2 className="text-[65px] text-[#438dff] font-semibold text-center">Olá</h2>

                        {introduction.pages.page1.visited ? (
                            <div className="text-[16px] text-gray-800 text-center">Sou Gemini, e serei seu professor durante sua jornada de aprendizado. <br />Estou aqui para te ajudar. Mas antes, como posso te chamar?</div>
                        ) : (
                            <div ref={page1El} className="text-[16px] text-gray-800 text-center" />
                        )}

                        {introduction.pages.page1.input && (
                            <motion.div
                                key="introduction-page-1-input"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants(2, 1)}
                                transition={pageTransition(2)}
                                onAnimationStart={() => {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page1: {
                                                ...prevState.pages.page1,
                                                button: false,
                                            },
                                        },
                                    }));
                                }}
                                onAnimationComplete={() => {
                                    if (userName.length > 2) {
                                        setIntroduction(prevState => ({
                                            ...prevState,
                                            pages: {
                                                ...prevState.pages,
                                                page1: {
                                                    ...prevState.pages.page1,
                                                    button: true,
                                                },
                                            },
                                        }));
                                    }
                                }}
                                className={`flex items-center justify-center w-full pt-[20px]`}
                            >
                                <Input
                                    placeholder="Digite seu nome"
                                    className="max-w-[300px]"
                                    value={userName}
                                    onChange={(e) => {
                                        if (e.target.value.length > 2) {
                                            setIntroduction(prevState => ({
                                                ...prevState,
                                                pages: {
                                                    ...prevState.pages,
                                                    page1: {
                                                        ...prevState.pages.page1,
                                                        button: true,
                                                    },
                                                },
                                            }));
                                        } else {
                                            setIntroduction(prevState => ({
                                                ...prevState,
                                                pages: {
                                                    ...prevState.pages,
                                                    page1: {
                                                        ...prevState.pages.page1,
                                                        button: false,
                                                    },
                                                },
                                            }));
                                        }
                                        setUserName(e.target.value);
                                    }}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {page === 2 && (
                    <motion.div
                        key="page2"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants(2, 1)}
                        transition={pageTransition(2)}
                        onAnimationStart={() => {
                            if (introduction.pages.page2.visited && personality) {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page2: {
                                            input: true,
                                            button: true,
                                            visited: true,
                                        },
                                    }
                                }));
                            }

                            if (!introduction.pages.page2.visited && !personality) {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page2: {
                                            ...prevState.pages.page2,
                                            input: false,
                                        },
                                    },
                                }));
                            }

                            if (!introduction.pages.page2.visited && personality) {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page2: {
                                            ...prevState.pages.page2,
                                            visited: true,
                                        },
                                    },
                                }));
                            }
                        }}
                        onAnimationComplete={() => {
                            if (introduction.pages.page2.visited) return;

                            new Typed(page2El.current, {
                                strings: [`Muito prazer <span class="userName">${userName}</span>. <br/>Como deseja que seja minha personalidade?`],
                                typeSpeed: 0, //25
                                showCursor: false,
                                onComplete: () => {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page2: {
                                                ...prevState.pages.page2,
                                                input: true,
                                            },
                                        },
                                    }));
                                }
                            });
                        }}
                        className="flex flex-col items-center justify-between gap-12 w-full"
                    >
                        {introduction.pages.page2.visited ? (
                            <div className="text-[16px] text-gray-800 text-center">Muito prazer <span className="userName">{userName}</span>. <br />Como deseja que seja minha personalidade?</div>
                        ) : (
                            <div ref={page2El} className="text-[16px] text-gray-800 text-center" />
                        )}

                        {introduction.pages.page2.input && (
                            <motion.div
                                key="introduction-page-2-radio"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants(2, 1)}
                                transition={pageTransition(2)}
                                onAnimationStart={() => {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page2: {
                                                ...prevState.pages.page2,
                                                button: false,
                                            },
                                        },
                                    }));
                                }}
                                onAnimationComplete={() => {
                                    if (personality.length > 4) {
                                        setIntroduction(prevState => ({
                                            ...prevState,
                                            pages: {
                                                ...prevState.pages,
                                                page2: {
                                                    ...prevState.pages.page2,
                                                    button: true,
                                                },
                                            },
                                        }));
                                    }
                                }}
                                className={`flex items-center justify-center w-full pt-[20px]`}
                            >
                                <RadioGroup
                                    classNames={{
                                        wrapper: cn(
                                            "flex flex-row flex-wrap items-center justify-center gap-2"
                                        ),
                                        description: cn(
                                            "text-danger"
                                        )
                                    }}
                                    value={personality}
                                    onValueChange={(value) => {
                                        setIntroduction(prevState => ({
                                            ...prevState,
                                            pages: {
                                                ...prevState.pages,
                                                page2: {
                                                    ...prevState.pages.page2,
                                                    button: true,
                                                },
                                            },
                                        }));
                                        setPersonality(value as TeacherPersonality);
                                    }}
                                    orientation="horizontal"
                                    description="* Imagens geradas com ajuda de IA para representação das personalidades."
                                >
                                    <CustomRadio value="Formal">
                                        <Image src={'/imgs/formal.jpeg'} className="rounded-br-[8px] rounded-bl-[8px]" width={225} height={225} alt="Imagem para representar a personalidade Formal" />
                                        <span className="block text-center font-semibold">Formal</span>
                                    </CustomRadio>
                                    <CustomRadio value="Informal">
                                        <Image src={'/imgs/informal.jpeg'} className="rounded-br-[8px] rounded-bl-[8px]" width={225} height={225} alt="Imagem para representar a personalidade Informal" />
                                        <span className="block text-center font-semibold">Informal</span>
                                    </CustomRadio>
                                    <CustomRadio value="Engraçado">
                                        <Image src={'/imgs/engracado.jpg'} className="rounded-br-[8px] rounded-bl-[8px]" width={225} height={225} alt="Imagem para representar a personalidade Engraçada" />
                                        <span className="block text-center font-semibold">Engraçado</span>
                                    </CustomRadio>
                                    <CustomRadio value="Sério">
                                        <Image src={'/imgs/serio.jpg'} className="rounded-br-[8px] rounded-bl-[8px]" width={225} height={225} alt="Imagem para representar a personalidade Séria" />
                                        <span className="block text-center font-semibold">Sério</span>
                                    </CustomRadio>
                                    <CustomRadio value="Default">
                                        <Image src={'/imgs/default.jpeg'} className="rounded-br-[8px] rounded-bl-[8px]" width={225} height={225} alt="Imagem para representar a personalidade Padrão" />
                                        <span className="block text-center font-semibold">Equilibrado</span>
                                    </CustomRadio>
                                </RadioGroup>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {page === 3 && (
                    <motion.div
                        key="page3"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants(2, 1)}
                        transition={pageTransition(2)}
                        onAnimationStart={() => {
                            if (introduction.pages.page3.visited && studyMaterial) {
                                if (studyMaterial.length < 5) {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page3: {
                                                ...prevState.pages.page3,
                                                button: false,
                                            },
                                        },
                                    }));

                                    return;
                                }

                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page3: {
                                            input: true,
                                            button: true,
                                            visited: true,
                                        },
                                    },
                                }));
                            }
                            
                            if (!introduction.pages.page3.visited && !studyMaterial) {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page3: {
                                            ...prevState.pages.page3,
                                            input: false,
                                        },
                                    },
                                }));
                            } 
                            
                            if (!introduction.pages.page3.visited && studyMaterial || introduction.pages.page3.visited && !studyMaterial) {
                                setIntroduction(prevState => ({
                                    ...prevState,
                                    pages: {
                                        ...prevState.pages,
                                        page3: {
                                            ...prevState.pages.page3,
                                            input: true,
                                        },
                                    },
                                }));
                            }
                        }}
                        onAnimationComplete={() => {
                            if (introduction.pages.page3.visited) return;

                            new Typed(page3El.current, {
                                strings: [`Agora, compartilhe comigo: qual tópico você gostaria de explorar? <br />Estou aqui para orientá-lo nessa jornada de aprendizado. <br/>Por gentileza, seja conciso. Por exemplo, você pode dizer: <br/><Code class="px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-default/40 text-default-foreground text-small rounded-small mt-[5px]">'História do Egito', 'Viagem à Lua', 'Guerra de Canudos' e assim por diante.</Code>`],
                                typeSpeed: 0, //25
                                showCursor: false,
                                onComplete: () => {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page3: {
                                                ...prevState.pages.page3,
                                                input: true,
                                            },
                                        },
                                    }));
                                }
                            });
                        }}
                        className="flex flex-col items-center justify-between gap-14 w-full"
                    >
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Image src={'/imgs/rocket.png'} width={150} height={150} alt="Ilustração de um foguete" />
                            <h2 className="text-[44px] text-[#438dff] font-semibold text-center">Excelente!</h2>
                        </div>

                        {introduction.pages.page3.visited ? (
                            <div className="text-[16px] text-gray-800 text-center">Agora, compartilhe comigo: qual tópico você gostaria de explorar? <br />Estou aqui para orientá-lo nessa jornada de aprendizado. Por gentileza, seja conciso. <br/>Por exemplo, você pode dizer: <br/><Code className="mt-[5px]">&apos;História do Egito&apos;, &apos;Viagem à Lua&apos;, &apos;Guerra de Canudos&apos; e assim por diante.</Code></div>
                        ) : (
                            <div ref={page3El} className="text-[16px] text-gray-800 text-center" />
                        )}

                        {introduction.pages.page3.input && (
                            <motion.div
                                key="introduction-page-3-input"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants(2, 1)}
                                transition={pageTransition(2)}
                                onAnimationStart={() => {
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        pages: {
                                            ...prevState.pages,
                                            page3: {
                                                ...prevState.pages.page3,
                                                button: false,
                                            },
                                        },
                                    }));
                                }}
                                onAnimationComplete={() => {
                                    if (studyMaterial.length > 4) {
                                        setIntroduction(prevState => ({
                                            ...prevState,
                                            pages: {
                                                ...prevState.pages,
                                                page3: {
                                                    ...prevState.pages.page3,
                                                    button: true,
                                                },
                                            },
                                        }));
                                    }
                                }}
                                className={`flex items-center justify-center w-full`}
                            >
                                <Input
                                    placeholder="Desejo aprender sobre..."
                                    className="max-w-[450px]"
                                    value={studyMaterial}
                                    onChange={(e) => {
                                        if (e.target.value.length > 4) {
                                            setIntroduction(prevState => ({
                                                ...prevState,
                                                pages: {
                                                    ...prevState.pages,
                                                    page3: {
                                                        ...prevState.pages.page3,
                                                        button: true,
                                                    },
                                                },
                                            }));
                                        } else {
                                            setIntroduction(prevState => ({
                                                ...prevState,
                                                pages: {
                                                    ...prevState.pages,
                                                    page3: {
                                                        ...prevState.pages.page3,
                                                        button: false,
                                                    },
                                                },
                                            }));
                                        }
                                        setStudyMaterial(e.target.value);
                                    }}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}

                <motion.div
                    key="introduction-options"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants(2)}
                    transition={pageTransition(2)}
                    className="flex flex-col items-center justify-between gap-7 select-none w-full md:max-w-[90%]"
                >
                    <div className="flex items-center justify-between gap-3 w-full">
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants(2)}
                            transition={pageTransition(2)}
                        >
                            <Button
                                className={`bg-[#68a2fe] w-[143px] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff] ${page === 1 ? "invisible select-none" : "visible"}`}
                                onClick={() => {
                                    setPage(page - 1);
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        actPage: page - 1,
                                        pages: {
                                            ...prevState.pages,
                                            [`page${page}` as keyof typeof introduction.pages]: {
                                                ...prevState.pages[`page${page}` as keyof typeof introduction.pages],
                                                input: false,
                                                button: false,
                                                visited: true,
                                            },
                                        }
                                    }));
                                }}
                            >
                                Retornar
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
                                className={`bg-[#68a2fe] w-[143px] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff]`}
                                isDisabled={!introduction.pages[`page${page}` as keyof typeof introduction.pages].button}
                                onClick={() => {
                                    if (page === 3) {
                                        setIntroduction(prevState => ({
                                            ...prevState,
                                            show: false,
                                            isLoading: true,
                                        }));
                                        return;
                                    }

                                    setPage(page + 1);
                                    setIntroduction(prevState => ({
                                        ...prevState,
                                        actPage: page + 1,
                                        pages: {
                                            ...prevState.pages,
                                            [`page${page}` as keyof typeof introduction.pages]: {
                                                ...prevState.pages[`page${page}` as keyof typeof introduction.pages],
                                                input: false,
                                                button: false,
                                                visited: true,
                                            },
                                        }
                                    }));
                                }}
                            >
                                {page === 3 ? "Aprender" : "Avançar"}
                            </Button>
                        </motion.div>
                    </div>
                    <div className="flex items-center justify-center gap-[15px] select-none">
                        <span className={`block w-[50px] h-[8px] rounded ${page === 1 ? "bg-[#076dff]" : "bg-[#92bcfd]"} transition-introduction`} />
                        <span className={`block w-[50px] h-[8px] rounded ${page === 2 ? "bg-[#076dff]" : "bg-[#92bcfd]"} transition-introduction`} />
                        <span className={`block w-[50px] h-[8px] rounded ${page === 3 ? "bg-[#076dff]" : "bg-[#92bcfd]"} transition-introduction`} />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Introduction;