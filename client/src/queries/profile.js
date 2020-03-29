import gql from 'graphql-tag';

export const FETCH_ALL_SKILLS = gql`
    {
        getSkills {
            id
        }
    }
`;
