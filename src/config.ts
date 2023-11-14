const parsePluginMenuItems = (variable: string | undefined): { text: string; path: string }[] => {
    if (!variable) {
        return [];
    }
    try {
        const parsed = JSON.parse(variable);

        return parsed;
    } catch (e) {
        return [];
    }
};

export default {
    defaultPageURL: process.env.HOME_URL,
    database: {
        url: process.env.DATABASE_URL,
    },
    jwtPublicKey: process.env.JWT_PUBLIC_KEY,
    defaultCandidateVendor: process.env.NEXT_PUBLIC_DEFAULT_CANDIDATE_VENDOR,
    gravatar: {
        url: process.env.GRAVATAR_URL,
    },
    sourceUsers: {
        sourceOfUsersUrl: process.env.NEXT_PUBLIC_SOURCE_OF_USERS_URL,
        sourceOfUsersByEmail: process.env.SOURCE_OF_USERS_BY_EMAIL,
        sendEmail: process.env.SEND_EMAIL,
        searchUsersList: process.env.SEARCHE_USERS_LIST,
        sourceOffUsersAccessToken: process.env.SOURCE_OF_USERS_ACCESS_TOKEN,
        userByEmailLink: process.env.NEXT_PUBLIC_LINK_TO_USER_BY_EMAIL,
    },
    nextAuth: {
        secret: process.env.NEXTAUTH_SECRET,
        keycloak: {
            id: process.env.KEYCLOAK_ID,
            secret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
            jwsAlgorithm: process.env.KEYCLOAK_JWS_ALGORITHM,
        },
    },
    mattermost: {
        hireSupportChannel: `${process.env.NEXT_PUBLIC_MATTERMOST_URL}channels/sd-hire-support`,
    },
    prisma: {
        options: {
            log: process.env.PRISMA_LOG === 'query' ? ['query'] : [],
        },
    },
    s3: {
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        bucket: process.env.S3_BUCKET,
    },
    pluginMenuItems: parsePluginMenuItems(process.env.NEXT_PUBLIC_PLUGIN_MENU_ITEMS),
};