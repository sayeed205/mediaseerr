import next from 'next';

import { getSettings, restartFlag } from '@/utils';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
export const prepare = async () => {
    await app.prepare();

    // Load Settings
    const settings = getSettings().load();
    restartFlag.initializeSettings(settings.main);
};
