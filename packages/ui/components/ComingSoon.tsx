import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const ComingSoon = ({useTranslations}: {useTranslations: any}) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-64">
              <ArrowPathIcon className="w-16 h-16 text-primary-main" />
              <p className="text-gray-500">{t('common.comingSoon')}</p>
    </div>
  )
}

export default ComingSoon