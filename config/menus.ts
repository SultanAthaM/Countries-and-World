export type MenuItem =
	| {
	key: string
	label: string
	to: string
	children?: MenuItem[]
}
	| {
	key: string
	label: string
	href: string
	target?: '_blank'
	rel?: 'noopener noreferrer'
	children?: MenuItem[]
}
	| {
	key: string
	label: string
	children: MenuItem[]
}


export const navigationMenu: MenuItem[] = [
	{
		key: 'nav-home',
		label: 'Home',
		to: '/'
	},
	{
		key: 'nav-country',
		label: 'Country',
		to: '/country'
	}
]

export const resourceMenu: MenuItem[] = [
	{
		key: 'rsrc-github',
		label: 'Github',
		href: 'https://github.com/SultanAthaM/Countries-and-World'
	}
]

export const legalMenu: MenuItem[] = [
	{
		key: 'legal-privacy',
		label: 'Privacy',
		to: '/privacy'
	},
	{
		key: 'legal-term',
		label: 'Terms',
		to: '/term'
	}
]