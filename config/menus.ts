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
	children?: MenuItem[]
}

export const contactMenu: MenuItem[] = [
	{
		key: 'contact-email',
		label: 'Sultan Atha Maulana',
	},
	{
		key: 'contact-email-gmail',
		label: 'Gmail: natureson111111@gmail.com',
		href: 'mailto:natureson111111@gmail.com'
	}
]

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
	},
	{
		key: 'nav-about',
		label: 'About',
		to: '/about'
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