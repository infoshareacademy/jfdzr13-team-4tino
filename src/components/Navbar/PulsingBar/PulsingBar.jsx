import React from 'react';
import { motion } from 'framer-motion';

const PulsingBar = () => {
    return (
        <div style={{ width: '100%', height: '2px' }}>
            <motion.div
                initial={{ width: '0%', height: '2px' }}
                animate={{
                    width: ['0%', '100%', '0%'],
                    backgroundColor: ['#72A0C1', '#85e03f', '#57AB27', '#72A0C1'],
                }}
                transition={{
                    duration: 2,
                    ease: 'linear',
                }}
            />
        </div>
    );
};

export default PulsingBar;