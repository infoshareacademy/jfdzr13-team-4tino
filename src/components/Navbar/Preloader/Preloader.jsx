import React from 'react';
import { motion } from 'framer-motion';

const PulsingBar = () => {
    return (
        <div style={{ width: '100%', height: '3px' }}>
            <motion.div
                initial={{ width: '0%', height: '3px' }}
                animate={{
                    width: ['0%', '100%', '0%'],
                    backgroundColor: ['#72A0C1', '#85e03f', '#57AB27', '#72A0C1'], // kolory w animacji
                }}
                transition={{
                    duration: 2,
                    // repeat: 1,
                    ease: 'linear',
                }}
            />
        </div>
    );
};

export default PulsingBar;








// import React, { useEffect, useState } from 'react';
// import '../../../tailwind.css';

// const Preloader = () => {
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         // Symulacja postępu ładowania
//         const interval = setInterval(() => {
//             // Zwiększ postęp o 25% przy każdym przebiegu
//             setProgress(prevProgress => (prevProgress >= 75 ? 100 : prevProgress + 25));
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//             <div
//                 className="h-1 bg-custom-green"
//                 style={{ width: `${progress}%` }}
//             ></div>
//     );
// }

// export default Preloader;