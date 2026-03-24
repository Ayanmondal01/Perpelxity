import React from 'react'
import { motion } from 'framer-motion'

const ChatInput = ({ chatInput, setChatInput, handleSubmitMessage }) => {
  const inputVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2, type: "spring", bounce: 0.2 } }
  }

  return (
    <motion.footer 
      variants={inputVariants}
      initial="hidden"
      animate="visible"
      className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-50 dark:from-[#0a0a0a] via-gray-50/90 dark:via-[#0a0a0a]/90 to-transparent pb-8 pt-16 z-10'
    >
      <div className='mx-auto max-w-4xl px-4 md:px-8'>
        <form onSubmit={handleSubmitMessage} className='relative flex items-center group shadow-2xl shadow-blue-500/5 rounded-full'>
          <input
            type='text'
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder='Ask anything...'
            className='w-full rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-3xl px-6 py-4 pr-16 text-[15.5px] text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-300 focus:border-black/20 dark:focus:border-white/20 focus:bg-white/80 dark:focus:bg-zinc-900/80 focus:ring-4 focus:ring-black/5 dark:focus:ring-white/5 placeholder:text-zinc-500 shadow-inner'
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={!chatInput.trim()}
            className='absolute right-2.5 rounded-full bg-zinc-900 dark:bg-white p-2.5 text-white dark:text-zinc-950 transition-all duration-300 disabled:opacity-30 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:cursor-not-allowed flex items-center justify-center shadow-lg'
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </form>
        <p className="mt-4 text-center text-[11.5px] text-zinc-500 font-medium tracking-wide">
          Perplexity uses AI. Check for mistakes.
        </p>
      </div>
    </motion.footer>
  )
}

export default ChatInput
