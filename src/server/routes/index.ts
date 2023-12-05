import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';

import { settings, status } from '@/server/routes/v1';

const apiApp = new Elysia({ prefix: '/api' })
    .group('/v1', v1 => v1.use(status))
    .group('/v1/settings', ctx => ctx.use(settings))
    .use(
        swagger({
            autoDarkMode: true,
            documentation: {
                info: {
                    title: 'Mediaseerr API',
                    version: '0.0.0',
                    description: 'Mediaseerr API Documentation',
                },
                tags: [
                    {
                        name: 'Public',
                        description:
                            'Public API endpoints requiring no authentication.',
                    },
                    {
                        name: 'Settings',
                        description: 'Settings API endpoints.',
                    },
                ],
            },
        }),
    );

export default apiApp;
export type API = typeof apiApp;
