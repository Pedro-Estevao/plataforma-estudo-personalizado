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
import Conversation from "@/components/Conversation";
import StudyPlatform from "@/components/StudyPlatform";

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
	const { introduction } = useAppContext();

	useEffect(() => {
		if (!introduction.show && introduction.isLoading) {
			
		}
	}, [introduction.show, introduction.isLoading]);

	return (
		<div>
			<AnimatePresence mode='popLayout'>
				{introduction.show && (
					<motion.div
						key="introduction"
						initial="initial"
						animate="in"
						exit="out"
						variants={pageVariants(2)}
						transition={pageTransition(2)}
						className="relative w-full h-full z-[999]"
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
						className="relative z-[998]"
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
					className={`relative z-[1] ${introduction.show || introduction.isLoading ? "invisible" : "visible"}`}
				>
					{/* <Conversation /> */}
					<StudyPlatform />
				</motion.div>

				<div className={`relative ${introduction.show || introduction.isLoading ? "hidden" : "flex"} flex-col h-screen`}>
					<Navbar />

					<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
						<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
							<div className="inline-block max-w-lg text-center justify-center">
								<h1 className={title()}>Make&nbsp;</h1>
								<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
								<br />
								<h1 className={title()}>
									websites regardless of your design experience.
								</h1>
								<h2 className={subtitle({ class: "mt-4" })}>
									Beautiful, fast and modern React UI library.
								</h2>
							</div>



							<div className="flex gap-3">
								<Link
									isExternal
									href={siteConfig.links.docs}
									className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
								>
									Documentation
								</Link>
								<Link
									isExternal
									className={buttonStyles({ variant: "bordered", radius: "full" })}
									href={siteConfig.links.github}
								>
									<GithubIcon size={20} />
									GitHub
								</Link>
							</div>

							<div className="mt-8">
								<Snippet hideSymbol hideCopyButton variant="flat">
									<span>
										Get started by editing <Code color="primary">app/page.tsx</Code>
									</span>
								</Snippet>
							</div>
						</div>
					</main>

					<footer className="w-full flex items-center justify-center py-3">
						<Link
							isExternal
							className="flex items-center gap-1 text-current"
							href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
							title="nextui.org homepage"
						>
							<span className="text-default-600">Powered by</span>
							<p className="text-primary">NextUI</p>
						</Link>
					</footer>
				</div>
			</AnimatePresence>
		</div>
	);
};

export default Home;
