import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../../app/theme.slice'

const SettingsModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch()
  const themeMode = useSelector(state => state.theme.mode)
  
  const userName = user?.username || 'User'
  const userEmail = user?.email || 'user@example.com'
  const initials = userName.substring(0, 2).toUpperCase()

  const handleThemeChange = (mode) => {
    dispatch(setTheme(mode))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-black/10 dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-6 py-4">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Settings</h2>
              <button 
                onClick={onClose}
                className="rounded-full p-2 text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10 dark:text-zinc-400 transition-colors"
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white shadow-inner shrink-0">
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 truncate">{userName}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{userEmail}</p>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Appearance</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Light Theme Button */}
                  <button 
                    onClick={() => handleThemeChange('light')}
                    className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all duration-200 ${themeMode === 'light' ? 'border-[#31b8c6] bg-[#31b8c6]/10' : 'border-black/5 dark:border-white/10 bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
                  >
                    <div className="p-2 rounded-full bg-white shadow-sm ring-1 ring-black/5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    </div>
                    <span className={`text-sm font-medium ${themeMode === 'light' ? 'text-[#31b8c6]' : 'text-zinc-700 dark:text-zinc-300'}`}>Light</span>
                  </button>

                  {/* Dark Theme Button */}
                  <button 
                    onClick={() => handleThemeChange('dark')}
                    className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all duration-200 ${themeMode === 'dark' ? 'border-[#31b8c6] bg-[#31b8c6]/10' : 'border-black/5 dark:border-white/10 bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
                  >
                    <div className="p-2 rounded-full bg-zinc-900 shadow-sm ring-1 ring-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                      </svg>
                    </div>
                    <span className={`text-sm font-medium ${themeMode === 'dark' ? 'text-[#31b8c6]' : 'text-zinc-700 dark:text-zinc-300'}`}>Dark</span>
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SettingsModal
