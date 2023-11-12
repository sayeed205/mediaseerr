import Elysia from 'elysia';

import apiApp from '@/server/routes';
import { handleBun } from '@/utils';

// Initialize the server
const app = new Elysia().use(apiApp);
export type API = typeof app;

app.onRequest(async ctx => {
    const path = new URL(ctx.request.url);
    if (path.pathname.startsWith('/api')) return;
    return await handleBun(ctx.request);
});

// start the server
app.listen(
    {
        port: parseInt(process.env.PORT ?? '3000'),
        hostname: process.env.HOSTNAME ?? '0.0.0.0',
    },
    data => {
        console.log(`Server started on http://${data.hostname}:${data.port}`);
    },
);
