import { useEffect, useState } from 'react';
import './../styles/rotatenotice.scss';

export default function RotateNotice() {
    const [portrait, setPortrait] = useState(
        window.matchMedia('(orientation: portrait)').matches
    );

    useEffect(() => {
        const mql = window.matchMedia('(orientation: portrait)');
        const handler = e => setPortrait(e.matches);

        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    if (!portrait) return null;

    return (
        <div className="rotate-overlay">
            Please rotate your device
        </div>
    );
}
