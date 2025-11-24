'use client';

import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import InfoCard from '../components/infoCard';
import { DynamicChartExample } from '@sporton/ui/components/DynamicChartExample';

export default function HomePage() {
  const { admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50  flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect to login via useAuth hook
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to SPORTON Monitor
              </h1>
              <p className="text-gray-600">
                Your comprehensive dashboard for monitoring and analytics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

              <InfoCard
                title='Total Accounts'
                value={1250}
                icon='👥'
                textColor='text-blue-600'
                iconColor='bg-blue-100'
              />

              <InfoCard
                title='Total Posts'
                value={3000}
                icon='📝'
                textColor='text-green-600'
                iconColor='bg-green-100'
              />

              <InfoCard
                title='Active Accounts'
                value={875}
                icon='🔥'
                textColor='text-red-600'
                iconColor='bg-red-100'
              />


              <InfoCard
                title='New Accounts Daily'
                value={150}
                icon='🆕'
                textColor='text-yellow-600'
                iconColor='bg-yellow-100'
              />

              <InfoCard
                title='New Posts Daily'
                value={200}
                icon='🆕'
                textColor='text-purple-600'
                iconColor='bg-purple-100'
              />

            </div>


            {/* <DynamicChartExample /> */}

            {/* Quick action Part */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/dashboard" className="p-4 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors">
                  View Dashboard
                </Link>
                <Link href="/statistics" className="p-4 bg-secondary-main text-white rounded-lg hover:bg-secondary-dark transition-colors">
                  Check Statistics
                </Link>
                <Link href="/health" className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  System Health
                </Link>
              </div>
            </motion.div> */}
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
