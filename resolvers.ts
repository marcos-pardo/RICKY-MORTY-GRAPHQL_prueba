import { Episode, Character } from "./types.ts";
import { GraphQLError } from "graphql";

type addID = {
    id: number
}

type addIds = {
    ids: number[]
}

export const resolvers = {
    Query:{
        character: async(_:unknown, args: addID): Promise<Character> => {
            
            const {id} = args

            const url = `https://rickandmortyapi.com/api/character/${id}`

            const data = await fetch(url)

            if(!data) throw new GraphQLError ("No existe personaje")

            const response: Character = await data.json() 

            return response
        },

        charactersByIds: async(_:unknown, args: addIds): Promise<Character[]> => {
            
            const {ids} = args

            const url = `https://rickandmortyapi.com/api/character/${ids}`

            const data = await fetch(url)

            if(!data) throw new GraphQLError ("No existe personaje")

            const response: Character[] = await data.json() 

            return response
        },
    },

    Character: {
        location: async(parent: Character, _: unknown): Promise<Location | null> => {
            try {
                const loc = parent.location.name

                const url = `https://rickandmortyapi.com/api/location/?name=${loc}`

                console.log(url)
                

                const data = await fetch(url)

                const response: Location = await data.json()


                console.log(response)

                return response

            }catch(e) {
                return null
            } 
        },

        origin: async(parent: Character, _: unknown): Promise<Location | null> => {
            
            try {
                const loc = parent.origin.url

                const data = await fetch(loc)

                const response: Location = await data.json()

                return response

            }catch(e) {
                return null
            } 
        },

        episode: async (parent: Character, _: unknown): Promise<Episode[]> => {
            const loc = parent.episode;

        
        
        
            const mapeo = await Promise.all(loc.map(async (elem) => {
                const data = await fetch(elem);
                const response: Episode = await data.json();
                return response;
            }));
        
            return mapeo;
        }
    },
    Episode :{
        characters: async (parent: Episode, _: unknown): Promise<Character[]> => {
            const loc = parent.characters;
            
            
        
            const mapeo = await Promise.all(loc.map(async (elem) => {
                const data = await fetch(elem);
                const response: Character = await data.json();
                return response;
            }));
        
            return mapeo;
        }

    },
    Location :{
        residents: async (parent: Location, _: unknown): Promise<Character[]> => {
            const loc = parent.residents;
            console.log(loc);
        
            const mapeo = await Promise.all(loc.map(async (elem) => {
                const data = await fetch(elem);
                const response: Character = await data.json();
                return response;
            }));
        
            return mapeo;
        }

    }

    

}