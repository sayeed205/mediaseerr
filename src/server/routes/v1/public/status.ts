import Elysia from 'elysia';

import {
    GithubAPI,
    appDataPath,
    appDataStatus,
    getAppVersion,
    getCommitTag,
} from '@/utils';

export const status = new Elysia()
    .get(
        '/status',
        async ctx => {
            const githubApi = new GithubAPI();

            const currentVersion = getAppVersion();
            const commitTag = getCommitTag();
            let updateAvailable = false;
            let commitsBehind = 0;

            if (
                currentVersion.startsWith('develop-') &&
                commitTag !== 'local'
            ) {
                const commits = await githubApi.getMediaseerrCommits();

                if (commits.length) {
                    const filteredCommits = commits.filter(
                        commit => !commit.commit.message.includes('[skip ci]'),
                    );
                    if (filteredCommits[0].sha !== commitTag) {
                        updateAvailable = true;
                    }

                    const commitIndex = filteredCommits.findIndex(
                        commit => commit.sha === commitTag,
                    );

                    if (updateAvailable) {
                        commitsBehind = commitIndex;
                    }
                }
            } else if (commitTag !== 'local') {
                const releases = await githubApi.getMediaseerrReleases();

                if (releases.length) {
                    const latestVersion = releases[0];

                    if (!latestVersion.name.includes(currentVersion)) {
                        updateAvailable = true;
                    }
                }
            }

            return {
                version: getAppVersion(),
                commitTag: getCommitTag(),
                updateAvailable,
                commitsBehind,
                //todo)) restartRequired: restartFlag.isSet(),
            };
        },
        { detail: { tags: ['Public'] } },
    )
    .get(
        '/status/appdata',
        ctx => ({
            appData: appDataStatus(),
            appDataPath: appDataPath(),
        }),
        { detail: { tags: ['Public'] } },
    );
