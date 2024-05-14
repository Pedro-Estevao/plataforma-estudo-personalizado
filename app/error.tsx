'use client'

import { useEffect } from 'react'
import { useAppContext } from "@/contexts/appContext"
import { pageTransition, pageVariants, resetContext } from "@/lib/utilFunctions"
import { Button } from "@nextui-org/button"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

export default function Error({
	error,
	reset,
}: {
	error: Error
	reset: () => void
}) {
	const { setIntroduction, setStudyPlatform } = useAppContext();

	useEffect(() => {
		resetContext(setIntroduction, setStudyPlatform);
		console.error(error)
	}, [error, setIntroduction, setStudyPlatform])

	return (
		<AnimatePresence>
			<motion.div
				key="introduction-logo"
				initial="initial"
				animate="in"
				exit="out"
				variants={pageVariants(2)}
				transition={pageTransition(2)}
			>
				<div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-12 p-10 w-full h-full z-[999] min-h-[100lvh] bg-white dark:bg-[#18181c]">
					<div className="flex flex-col items-center justify-center gap-5">
						<h2 className="text-[30px] text-gray-800 dark:text-[#9ca3af] uppercase text-center">Algo deu errado!</h2>
						<Image src="/imgs/browser.png" width={250} height={250} alt="Error page" />
						<Button
							className={`bg-[#68a2fe] w-[143px] text-white border-none outline-none rounded-[20px] hover:bg-[#076dff]`}
							onClick={() => reset()}
						>
							Recarregar
						</Button>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}