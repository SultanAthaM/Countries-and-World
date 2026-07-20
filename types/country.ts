export interface Country {
	name: {
		common: string;
		official: string;
		nativeName?: { lang: string; official: string; common: string }[];
	};
	tld?: string[];
	cca2: string;
	ccn3?: string;
	cca3: string;
	cioc?: string;
	fifa?: string;
	independent?: boolean;
	status: string;
	unMember: boolean;
	currencies?: { code: string; name: string; symbol: string }[];
	idd: {
		root?: string;
		suffixes?: string[];
	};
	capital?: string[];
	capitalInfo?: {
		latlng?: number[];
	};
	altSpellings?: string[];
	region: string;
	subregion?: string;
	continents: string[];
	languages?: { iso639_1: string | null; iso639_2: string; name: string; nativeName: string | null }[];
	translations: { lang: string; official: string; common: string }[];
	geolocation: {
		latitude: number;
		longitude: number;
	};
	landlocked: boolean;
	borders?: string[];
	area: number;
	demonyms?: { lang: string; male: string; female: string }[];
	coatOfArms: {
		svg?: string;
		png?: string;
	};
	population: number;
	maps: {
		googleMaps: string;
		openStreetMaps: string;
	};
	gini?: { year: string; value: number }[];
	car: {
		signs?: string[];
		side: string;
	};
	postalCode?: {
		format: string | null;
		regex?: string | null;
	};
	startOfWeek: string;
	timezones: string[];
	callingCodes?: string[];
	regionalBlocs?: { acronym: string; name: string; otherNames: string[] }[];
	religion?: { name: string; population?: number; percentage?: number }[];
	ethnicity?: { name: string; percentage?: number }[];
	government?: { type: string; leaders?: { title: string; name: string }[] };
	density?: number;
	gdp?: { total: number; perCapita: number; currency?: string };
	nationalHoliday?: string | null;
	anthem?: string;
	hdi?: number;
	sovereignState?: string;
	flag: {
		svg: string;
		png: string;
		alt?: string;
		emoji?: string;
	};
}
