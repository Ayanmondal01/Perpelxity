import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'

const MessageList = ({ chats, currentChatId, messagesEndRef }) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: "spring", bounce: 0.4 } }
  }

  return (
    <div className='flex-1 overflow-y-auto pb-40 pt-10 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      <div className='mx-auto flex max-w-4xl flex-col space-y-8 px-4 md:px-8 relative'>
        <AnimatePresence mode="popLayout">
          {chats[currentChatId]?.messages.map((message, i) => (
            <motion.div
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              layout
              key={message.id || i}
              className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`leading-relaxed max-w-full w-full ${message.role === 'user'
                  ? 'bg-gray-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-3xl rounded-br-sm px-6 py-3.5 sm:max-w-[70%] border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5 dark:shadow-black/20 text-[16px] md:text-[17px]'
                  : 'text-zinc-800 dark:text-zinc-200 text-[16px] md:text-[17px]'
                  }`}
              >
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-5 last:mb-0 text-zinc-700 dark:text-zinc-300 font-light tracking-wide'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-5 list-disc pl-6 space-y-2 marker:text-zinc-400 dark:marker:text-zinc-500 text-zinc-700 dark:text-zinc-300'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-5 list-decimal pl-6 space-y-2 marker:text-zinc-400 dark:marker:text-zinc-500 text-zinc-700 dark:text-zinc-300'>{children}</ol>,
                      li: ({ children }) => <li className='text-zinc-700 dark:text-zinc-300'>{children}</li>,
                      code: ({ children }) => <code className='rounded-md bg-black/5 dark:bg-white/5 px-1.5 py-0.5 text-[14.5px] font-mono text-zinc-800 dark:text-zinc-200 border border-black/10 dark:border-white/10'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-5 mt-2 overflow-x-auto rounded-2xl bg-zinc-100 dark:bg-black p-5 text-[14.5px] font-mono border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 dark:shadow-black/40 text-zinc-800 dark:text-zinc-200'>{children}</pre>,
                      h1: ({ children }) => <h1 className="text-2xl font-medium mb-5 mt-8 text-zinc-900 dark:text-zinc-100 tracking-tight">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-medium mb-4 mt-8 text-zinc-900 dark:text-zinc-100 tracking-tight">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-medium mb-3 mt-6 text-zinc-900 dark:text-zinc-100 tracking-tight">{children}</h3>,
                      a: ({ children, href }) => <a href={href} className="text-[#008ba3] dark:text-[#31b8c6] hover:text-[#006f82] dark:hover:text-[#45c7d4] transition-colors underline underline-offset-4 decoration-black/20 dark:decoration-white/20">{children}</a>
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {(!chats[currentChatId] || chats[currentChatId].messages.length === 0) && (
            <motion.div 
              variants={emptyStateVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex h-[60vh] flex-col items-center justify-center text-zinc-500 absolute w-full top-0 left-0"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/5 mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/10 cursor-default"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-zinc-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
              </motion.div>
              <h2 className="text-2xl font-light text-zinc-700 dark:text-zinc-300 mb-2 tracking-wide">What do you want to know?</h2>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default MessageList
