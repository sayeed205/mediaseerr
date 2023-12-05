import { initialize } from 'next/dist/server/lib/router-server';

import { IncomingMessage, ServerResponse } from 'http';

// required globals for translating Bun API to Node
const INTERNAL_SOCKET_DATA = Symbol.for('::bunternal::');
const EMPTY_BUFFER = Buffer.alloc(0);

// Initialize the next server
const [handle, handleUpgrade] = await initialize({
    dev: process.env.NODE_ENV !== 'production',
    port: parseInt(process.env.PORT ?? '3000'),
    dir: process.cwd(),
    isNodeDebugging: process.env.NODE_DEBUG === 'true',
    customServer: true,
});

/**
 * Handles Next.JS routes
 */
export const handleBun = (req: Request, app: any) => {
    return new Promise<Response | void>(resolve => {
        // Convert to a Node request
        // @ts-ignore
        const http_req = new IncomingMessage(req);
        const http_res = new ServerResponse({
            // @ts-ignore
            reply: resolve,
            req: http_req,
        });

        // fix websocket support
        // @ts-ignore
        http_req.socket[INTERNAL_SOCKET_DATA] = [app.server, http_res, req];

        // check if it's an upgrade request
        if (req.headers.get('upgrade')) {
            handleUpgrade(http_req, http_req.socket, EMPTY_BUFFER);
            return;
        }

        // render the page
        handle(http_req, http_res);
    });
};
