
export type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image: string,
    episode: Episode[],
    url: string,
    created: string
    location: Location,
    origin: Location
}

export type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: Character[],
    url: string,
    created: string
}

export type Location = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    url: string,
    residents: Character[],
    created: string
}
