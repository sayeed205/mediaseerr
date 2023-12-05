import { OpenAPIV3 } from 'openapi-types';

export const publicStatusResponse: OpenAPIV3.ResponsesObject = {
    200: {
        description: 'Successful response',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        version: {
                            type: 'string',
                            description: 'The current version of Mediaseerr.',
                            example: '0.0.0',
                        },
                        commitTag: {
                            type: 'string',
                            description:
                                'The current commit tag of Mediaseerr.',
                            example: 'local',
                        },
                        updateAvailable: {
                            type: 'boolean',
                            description: 'Whether an update is available.',
                        },
                        commitsBehind: {
                            type: 'number',
                            description:
                                'The number of commits behind the latest version.',
                        },
                        restartRequired: {
                            type: 'boolean',
                            description: 'Whether a restart is required.',
                        },
                    },
                },
            },
        },
    },
};

export const publicStatusAppDataResponse: OpenAPIV3.ResponsesObject = {
    200: {
        description: 'Successful response',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        appData: {
                            type: 'boolean',
                            description: 'The current status of the app data.',
                        },
                        appDataPath: {
                            type: 'string',
                            description: 'The path to the app data.',
                            example: '/config/mediaseerr',
                        },
                    },
                },
            },
        },
    },
};
