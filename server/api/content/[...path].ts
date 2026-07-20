import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
	const path = getRouterParam(event, 'path')

	if (!path) {
		throw createError({ statusCode: 400, statusMessage: 'Path is required' })
	}

	const filePath = join(process.cwd(), 'content', `${path}.md`)

	try {
		const content = await readFile(filePath, 'utf-8')
		const fileName = path.split('/').pop() || path

		setResponseHeaders(event, {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Content-Disposition': `attachment; filename="${fileName}.md"`,
			'Cache-Control': 'public, max-age=86400'
		})

		return content
	} catch {
		throw createError({ statusCode: 404, statusMessage: 'Content file not found' })
	}
})
