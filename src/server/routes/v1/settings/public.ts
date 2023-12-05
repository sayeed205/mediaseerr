import Elysia from 'elysia';

export const settings = new Elysia().get(
    '/public',
    async ctx => {
        return 'hi';
    },
    {
        detail: { tags: ['Settings'] },
    },
);
