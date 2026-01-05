export interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: Record<string, { official: string; common: string }>;
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
    currencies?: Record<string, { name: string; symbol: string }>;
    idd: {
        root?: string;
        suffixes?: string[];
    };
    capital?: string[];
    capitalInfo?: { // Marked optional
        latlng?: number[];
    };
    altSpellings?: string[];
    region: string;
    subregion?: string;
    continents: string[];
    languages?: Record<string, string>;
    translations: Record<string, { official: string; common: string }>;
    latlng: number[];
    landlocked: boolean;
    borders?: string[];
    area: number;
    flag: string;
    demonyms?: Record<string, { f: string; m: string }>;
    flags: {
        svg: string;
        png: string;
        alt?: string;
    };
    coatOfArms: {
        svg?: string;
        png?: string;
    };
    population: number;
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    gini?: Record<string, number>;
    car: {
        signs?: string[];
        side: string;
    };
    postalCode?: {
        format: string;
        regex?: string;
    };
    startOfWeek: string;
    timezones: string[];
}