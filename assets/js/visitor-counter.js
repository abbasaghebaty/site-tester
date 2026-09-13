const D8A_PROPERTY_ID = '2c8daccc-5b23-4555-a117-473a0405398e';
const D8A_TRACKING_URL = `https://global.t.d8a.tech/${D8A_PROPERTY_ID}/d/c`;

const COUNTER_NAMESPACE = 'abbas-aghebaty-site-tester';
const COUNTER_ACTION = 'view';
const COUNTER_KEY = 'visitors';
const COUNTER_URL = `https://counterapi.com/api/${COUNTER_NAMESPACE}/${COUNTER_ACTION}/${COUNTER_KEY}?unique=true`;

export function initVisitorCounter({ statValues, tryAnimateStat }) {
    if (!statValues || typeof tryAnimateStat !== 'function') return;

    initD8aTracking();
    fetchVisitorCount();
}

function initD8aTracking() {
    const scriptId = 'd8a-web-tracker';
    if (document.getElementById(scriptId)) return;

    window.d8aLayer = window.d8aLayer || [];
    window.d8a = window.d8a || function() {
        window.d8aLayer.push(arguments);
    };

    window.d8a('js', new Date());
    window.d8a('config', D8A_PROPERTY_ID, {
        server_container_url: D8A_TRACKING_URL,
    });

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/@d8a-tech/wt/dist/wt.min.js';
    script.onerror = () => console.warn('d8a web tracker could not be loaded.');
    document.head.appendChild(script);
}

async function fetchVisitorCount() {
    try {
        const response = await fetch(COUNTER_URL, {
            method: 'GET',
            cache: 'no-store',
            signal: AbortSignal.timeout(6000),
        });

        if (!response.ok) throw new Error(`CounterAPI: ${response.status}`);

        const data = await response.json();
        const value = Number(data?.value);
        if (!Number.isFinite(value) || value < 0) {
            throw new Error('Invalid CounterAPI response');
        }

        statValues.visitors = Math.floor(value);
        tryAnimateStat('visitors');
    } catch (err) {
        // Never fabricate a number if the shared counter is unavailable.
        console.warn('Visitor counter unavailable:', err.message);
    }
}
