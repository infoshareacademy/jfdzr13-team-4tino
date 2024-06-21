import React, { useEffect, useState } from 'react';
import '../../../tailwind.css';

const Preloader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Symulacja postępu ładowania
        const interval = setInterval(() => {
            // Zwiększ postęp o 25% przy każdym przebiegu
            setProgress(prevProgress => (prevProgress >= 75 ? 100 : prevProgress + 25));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
            <div
                className="h-1 bg-custom-green"
                style={{ width: `${progress}%` }}
            ></div>
    );
}

export default Preloader;