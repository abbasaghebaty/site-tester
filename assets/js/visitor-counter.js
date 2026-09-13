const D8A_PROPERTY_ID = '2c8daccc-5b23-4555-a117-473a0405398e';
const D8A_TRACKING_URL = `https://global.t.d8a.tech/${D8A_PROPERTY_ID}/d/c`;

/**
 * Initializes real visitor tracking through d8a.
 *
 * The old implementation fabricated a number with localStorage when CountAPI
 * was unavailable. That fallback is intentionally gone: visitor data must
 * come from the shared analytics backend, never from one browser.
 */
export function initVisitorCounter({ statValues, tryAnimateStat }) {
    if (!statValues || typeof tryAnimateStat !== 'function') return;

    const scriptId = 'd8a-web-tracker';

    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = 'https://global.t.d8a.tech/js';
        script.onload = () => {
            if (!window.d8a) return;

            window.d8a('js', new Date());
            window.d8a('config', D8A_PROPERTY_ID, {
                server_container_url: D8A_TRACKING_URL,
            });
        };
        script.onerror = () => {
            console.warn('d8a web tracker could not be loaded.');
        };

        document.head.appendChild(script);
    }

    // d8a's /d/c endpoint is a collector, not a public total-counter API.
    // Therefore do not fabricate a visible visitor number when no trusted
    // public count endpoint is available.
    statValues.visitors = 0;
    tryAnimateStat('visitors');
}
