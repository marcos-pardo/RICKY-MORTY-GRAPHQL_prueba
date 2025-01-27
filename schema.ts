export const schema = `#graphql

    type Episode {
        id: ID!
        name: String!
        air_date: String!
        episode: String!
        characters: [Character]!
        url: String!
        created: String! 
    }

     type Character {
        id: ID!
        name: String!
        status: String!
        species: String!
        type: String!
        gender: String!
        image: String!
        episode: [Episode!]!
        url: String!
        created: String!
        location: Location
        origin: Location
    }

    type Location {
        id: ID!
        name: String!
        type: String!
        dimension: String!
        residents: [Character]!
        created: String!
    }

    type Query {
        character(id: ID!): Character
        charactersByIds(ids: [ID!]!): [Character]
    } 
`