import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/Sidebar'
import MessageList from '../components/MessageList'
import ChatInput from '../components/ChatInput'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const user = useSelector(state => state.auth.user)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, currentChatId])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const startNewChat = () => {
    chat.handleNewChat()
  }

  return (
    <main className='flex h-screen w-full bg-gray-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-black/10 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white overflow-hidden'>
      <Sidebar 
        chats={chats}
        currentChatId={currentChatId}
        startNewChat={startNewChat}
        openChat={openChat}
        user={user}
      />

      <section className='relative flex h-full min-w-0 flex-1 flex-col'>
        <MessageList 
          chats={chats}
          currentChatId={currentChatId}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput 
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSubmitMessage={handleSubmitMessage}
        />
      </section>
    </main>
  )
}

export default Dashboard