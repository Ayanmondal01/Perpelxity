import React from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const LandingPage = () => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    // Redirect to dashboard if logged in
    if (!loading && user) {
        return <Navigate to="/dashboard" replace />
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Navbar */}
            <header className="absolute top-0 w-full z-50 px-6 py-6 sm:px-12 flex justify-between items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                        Perplexity
                    </span>
                </motion.div>
                <motion.nav 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                >
                    <Link 
                        to="/login"
                        className="px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:scale-105 transition-transform shadow-lg shadow-black/10 dark:shadow-white/10"
                    >
                        Account
                    </Link>
                </motion.nav>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
                <motion.div 
                    className="text-center max-w-4xl mx-auto mt-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xl px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                        The AI search engine you deserve
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8">
                        Knowledge, <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                            unlocked.
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Discover the fastest way to get answers, verify facts, and expand your horizons with the power of modern artificial intelligence.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/login"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 group w-full sm:w-auto"
                        >
                            Start Researching
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}

export default LandingPage
