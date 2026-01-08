export default defineEventHandler((event) => {
	setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
	setHeader(event, 'Pragma', 'no-cache')
	setHeader(event, 'Expires', '0')
	setHeader(event, 'Surrogate-Control', 'no-store')
	
	const codes = ['USA', 'IDN', 'JPN', 'FRA', 'BRA']
	const code = codes[Math.floor(Math.random() * codes.length)]
	
	return sendRedirect(event, `/country/${code}`, 302)
})
