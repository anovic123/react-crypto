import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  children: React.ReactNode;
}

export const Preloader: FC<PreloaderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const preloaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <motion.div
            className=" h-[6rem] w-[6rem] md:h-[8rem] md:w-[8rem] bg-gradient-to-r from-[#0c57ed] to-[#d6ed0c]"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ['10%', '30%', '50%', '50%', '30%'],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
            variants={preloaderVariants}
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
