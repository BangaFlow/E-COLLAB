import { gql } from 'apollo-boost';

import client from './client';

const FETCH_ALL_SKILLS = gql`
    query getSkills {
        getSkills {
            id
            label
            description
            type
        }
    }
`;

async function getSkills() {
    const {data }= await client.query({ query: FETCH_ALL_SKILLS });
    return data;
}

export { getSkills }