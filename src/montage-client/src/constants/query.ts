import gql from 'graphql-tag'

export const ALL_USERS = gql`
    {
        users{
        id,
        username,
        isSuperuser
        }
    }
    `