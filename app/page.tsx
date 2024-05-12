'use client';

import React, { useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/Icons";
import { useAppContext } from "@/contexts/appContext";
import Introduction from "@/components/Introduction";
import { Navbar } from "@/components/Navbar";
import IntroductionLoading from "@/components/IntroductionLoading";
import { AnimatePresence, motion } from "framer-motion";
import StudyPlatform from "@/components/StudyPlatform";
import { useWindowSize } from "usehooks-ts";

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

const Home = () => {
	const { introduction, setSidebar, studyPlatform } = useAppContext();
    const { width } = useWindowSize();

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (width > 991) {
				setSidebar({ expanded: false });
			}
		});
    }, [setSidebar, width]);

	return (
		<>
			<AnimatePresence mode='popLayout'>
				{introduction.show && (
					<motion.div
						key="introduction"
						initial="initial"
						animate="in"
						exit="out"
						variants={pageVariants(2)}
						transition={pageTransition(2)}
						className="relative w-full h-full min-h-[100lvh] z-[999]"
					>
						<Introduction />
					</motion.div>
				)}

				{introduction.isLoading && (
					<motion.div
						key="introduction-loading"
						initial="initial"
						animate="in"
						exit="out"
						variants={pageVariants(3)}
						transition={pageTransition(2)}
						className="relative w-full h-full min-h-[100lvh] z-[998]"
					>
						<IntroductionLoading />
					</motion.div>
				)}

				<motion.div
					key="study-platform"
					initial="initial"
					animate="in"
					exit="out"
					variants={pageVariants(3)}
					transition={pageTransition(2)}
					className={`relative w-full h-full min-h-[100lvh] z-[1] ${studyPlatform.show ? "visible" : "invisible"}`}
				>
					<StudyPlatform />
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default Home;
