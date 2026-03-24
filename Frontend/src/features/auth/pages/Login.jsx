import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleLogin } = useAuth()

  const navigate = useNavigate()

  const submitForm = async (event) => {
    event.preventDefault()

    const payload = {
      email,
      password,
    }

    await handleLogin(payload)
    navigate("/dashboard")

  }

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] px-4 py-10 text-zinc-900 dark:text-zinc-100 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Subtle Background Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 p-8 shadow-2xl shadow-black/5 dark:shadow-black/50 backdrop-blur-xl z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-semibold text-zinc-900 dark:text-white text-center tracking-tight">
          Welcome back
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to continue to Perplexity
        </motion.p>

        <motion.form variants={itemVariants} onSubmit={submitForm} className="mt-8 space-y-5">
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-black/10 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-inner"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-black/10 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-inner"
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full rounded-xl bg-zinc-900 dark:bg-white px-4 py-3.5 font-semibold text-white dark:text-zinc-900 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 mt-6 shadow-lg shadow-black/10 dark:shadow-white/10"
          >
            Continue
          </motion.button>
        </motion.form>

        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-zinc-900 dark:text-white/90 transition-colors hover:underline dark:hover:text-white">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Login