import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SettingsModal from './SettingsModal'

const Sidebar = ({ chats, currentChatId, startNewChat, openChat, user }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [sidebarWidth, setSidebarWidth] = useState(340)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const userName = user?.username || 'User'
  const userEmail = user?.email || 'user@example.com'
  const initials = userName.substring(0, 2).toUpperCase()

  const startResizing = useCallback((mouseDownEvent) => {
    const startWidth = sidebarWidth
    const startPosition = mouseDownEvent.clientX

    const doDrag = (dragEvent) => {
      setSidebarWidth(Math.max(340, Math.min(400, startWidth + dragEvent.clientX - startPosition)))
    }

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag)
      document.removeEventListener('mouseup', stopDrag)
    }

    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
  }, [sidebarWidth])

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.05 }
    }
  }

  const sidebarItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  }

  return (
    <>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} user={user} />

      <motion.aside
        style={{ width: sidebarWidth }}
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className='hidden h-full shrink-0 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl border-r border-black/5 dark:border-white/5 px-4 py-5 md:flex md:flex-col shadow-2xl relative z-20 transition-[width] duration-0'
      >
        <div
          onMouseDown={startResizing}
          className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-black/10 dark:hover:bg-white/20 active:bg-black/20 dark:active:bg-white/30 transition-colors z-50"
        />

        <div className="mb-8 px-1 flex items-center justify-between">
          <h1 className='text-[20px] font-medium tracking-tight bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent'>Perplexity</h1>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={startNewChat}
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-300"
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </motion.button>
        </div>

        <div className='space-y-1 overflow-y-auto flex-1 scrollbar-hide'>
          <p className="px-2 text-[12px] font-semibold text-zinc-400 dark:text-zinc-500 mb-3 uppercase tracking-widest">Recent Chats</p>
          {Object.values(chats).map((chatItem, index) => (
            <motion.div
              variants={sidebarItemVariants}
              key={chatItem.id || index}
              className={`group relative flex items-center w-full rounded-xl transition-all duration-300 ${currentChatId === chatItem.id ? 'bg-black/5 dark:bg-zinc-800 shadow-inner' : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <button
                onClick={() => { openChat(chatItem.id) }}
                type='button'
                className={`flex-1 px-3 py-2.5 text-left text-[15px] font-medium truncate ${currentChatId === chatItem.id ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100'}`}
              >
                {chatItem.title?.replace(/\*\*/g, '')}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === chatItem.id ? null : chatItem.id) }}
                className={`p-1.5 mr-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10 transition-colors ${openMenuId === chatItem.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'}`}
                title="Options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>

              <AnimatePresence>
                {openMenuId === chatItem.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-2 top-10 bg-white dark:bg-[#2a2a2a] border border-black/10 dark:border-white/10 rounded-xl p-1 z-50 shadow-2xl min-w-[140px]"
                  >
                    <button
                      className="w-full text-left px-3 py-2 text-[13px] font-medium text-red-600 dark:text-red-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); /* Delete action placeholder */ }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="relative mt-4 pt-4 border-t border-black/5 dark:border-white/5">
          <AnimatePresence>
            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-0 mb-3 w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1e1e1e] shadow-2xl overflow-hidden z-50 p-2"
              >
                <div className="px-3 py-3 border-b border-black/5 dark:border-white/10 mb-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium shadow-inner shrink-0 leading-none">
                      {initials}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[15px] font-medium text-zinc-900 dark:text-white truncate">{userName}</p>
                      <p className="text-[12px] text-zinc-500 dark:text-zinc-400 truncate">{userEmail}</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full text-left px-3 py-2.5 text-[14px] font-medium text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors flex items-center gap-3 mt-1"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-[14px] font-medium shadow-inner shrink-0 transition-transform group-hover:scale-105 leading-none">
                {initials}
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[14px] font-medium text-zinc-900 dark:text-zinc-200 truncate pr-2">{userName}</p>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-500 truncate mt-0.5">{userEmail}</p>
              </div>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation()
                setIsSettingsOpen(true)
                setIsProfileMenuOpen(false)
              }}
              className="px-3 py-1 text-[11px] font-semibold text-zinc-700 dark:text-white border border-black/10 dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            >
              Settings
            </div>
          </button>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
