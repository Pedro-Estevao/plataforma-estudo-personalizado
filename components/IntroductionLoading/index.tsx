import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Typed from "typed.js";

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

const IntroductionLoading = () => {
    const infoEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const typed = new Typed(infoEl.current, {
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
        <div className={`fixed top-0 left-0 right-0 bottom-0 h-[100lvh] w-[100lvw] flex flex-col items-center justify-between gap-12 overflow-y-auto p-10 z-[999] max-sm:px-3`}>
            <AnimatePresence mode='popLayout'>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants(2)}
                    transition={pageTransition(2)}
                    className="flex flex-col items-center justify-center gap-4 w-full h-full"
                >
                    <span className="loader">
                        <span className="loader-inner" />
                    </span>
                    <span ref={infoEl} className="introLoading text-[16px] text-gray-800 text-center" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default IntroductionLoading;