'use client';

import React, { useEffect } from "react";
import { useAppContext } from "@/contexts/appContext";
import Introduction from "@/components/Introduction";
import IntroductionLoading from "@/components/IntroductionLoading";
import { AnimatePresence, motion } from "framer-motion";
import StudyPlatform from "@/components/StudyPlatform";
import { useWindowSize } from "usehooks-ts";
import { pageTransition, pageVariants } from "@/lib/utilFunctions";

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
					className={`relative w-full h-full z-[1] ${studyPlatform.show ? "min-h-[100lvh] visible" : "invisible h-0 max-h-0 overflow-hidden"}`}
				>
					<StudyPlatform />
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default Home;
