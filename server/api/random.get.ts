import { sendRedirect } from 'h3'

const CODES = [
	'AFG','ALB','DZA','USA','IDN','JPN'
	// full list
]

export default defineEventHandler((event) => {
	const code = CODES[Math.floor(Math.random() * CODES.length)]
	return sendRedirect(event, `/country/${code}`)
})
