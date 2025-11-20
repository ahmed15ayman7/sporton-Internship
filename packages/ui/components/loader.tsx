import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const Loader = ({ language,siteName }: { language: 'en' | 'ar',siteName: string }  ) => {
  return (
    <div className="h-screen  flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Image src={`${siteName}/images/loader2.gif`} alt="Logo" className='rounded-full' width={200} height={200} />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-secondary-main mb-2"
      >
        SPORTON
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-secondary-main/80"
      >
        {language === 'en' ? 'Loading...' : 'جاري التحميل...'}
      </motion.p>
    </motion.div>
  </div>
  )
}

export default Loader