const COUNTER_NAMESPACE = 'abbas-aghebaty-site-tester';
const COUNTER_ACTION = 'view';
const COUNTER_KEY = 'visitors';
const COUNTER_START_NUMBER = 243;

// CounterAPI's public API endpoint increments the counter and returns the
// current value in the same request. Keeping the URL simple also avoids
// relying on deprecated/unsupported query combinations.
const COUNTER_URL = `https://counterapi.com/api/${COUNTER_NAMESPACE}/${COUNTER_ACTION}/${COUNTER_KEY}?startNumber=${COUNTER_START_NUMBER}`;

export function initVisitorCounter({ statValues, tryAnimateStat }) {
    if (!statValues || typeof tryAnimateStat !== 'function') return;

    fetchVisitorCount(statValues, tryAnimateStat);
}

async function fetchVisitorCount(statValues, tryAnimateStat) {
    try {
        const response = await fetch(COUNTER_URL, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`CounterAPI request failed: ${response.status}`);
        }

        const data = await response.json();
        const value = Number(data?.value);

        if (!Number.isFinite(value) || value < 0) {
            throw new Error('CounterAPI returned an invalid value');
        }

        statValues.visitors = Math.floor(value);
        tryAnimateStat('visitors');
    } catch (error) {
        // Keep the UI at its fallback value instead of displaying fabricated data.
        console.warn('Visitor counter unavailable:', error);
    }
}
