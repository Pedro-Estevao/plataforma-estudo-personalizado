'use client'

import { useAppContext } from "@/contexts/appContext"
import { resetContext } from "@/lib/utilFunctions"
import { useEffect } from 'react'

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
		<div>
			<h2>Something went wrong!</h2>
			<button onClick={() => reset()}>
				Try again
			</button>
		</div>
	)
}