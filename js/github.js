const WORKER_URL = 'https://yellow-pine-f67f.victortilleria116.workers.dev';

const GitHub = {

    async leer(path) {
        const res = await fetch(`${WORKER_URL}/?path=${encodeURIComponent(path)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.content) return null;
        return JSON.parse(atob(data.content.replace(/\n/g, '')));
    },

    async escribir(path, contenido, sha = null) {
        const body = {
            message: `update ${path}`,
            content: btoa(unescape(encodeURIComponent(JSON.stringify(contenido, null, 2)))),
        };
        if (sha) body.sha = sha;
        const res = await fetch(`${WORKER_URL}/?path=${encodeURIComponent(path)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return res.ok;
    },

    async sha(path) {
        const res = await fetch(`${WORKER_URL}/?path=${encodeURIComponent(path)}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.sha || null;
    }

};
