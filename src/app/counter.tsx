'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

export function Counter() {
    const [data, setData] = useState('Loading...');

    useEffect(() => {
        api.api.count.get().then(response => {
            if (response.error) {
                setData(`Error: ${response.error}`);
                return;
            }

            setData(response.data.message);
        });
    }, []);

    return <span>{data}</span>;
}
