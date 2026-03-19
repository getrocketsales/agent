'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

const AGENTS = [
  { id: 'general', label: 'General', icon: '', desc: 'Research, questions, brainstorming' },
  { id: 'seo', label: 'SEO', icon: '', desc: 'Rankings, keywords, technical SEO' },
  { id: 'copywriting', label: 'Copywriting', icon: '', desc: 'Web copy, landing pages, emails' },
  { id: 'social', label: 'Social Media', icon: '', desc: 'Posts, captions, campaigns' },
  { id: 'ads', label: 'Paid Ads', icon: '', desc: 'Google Ads, Facebook Ads copy' },
  { id: 'content', label: 'Content', icon: '', desc: 'Blogs, articles, content strategy' },
]

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Client {
  id: string
  name: string
  slug: string
  domain?: string
}

export default function AgentPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => `session-${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase
        .from('businesses')
        .select('id, name, slug, domain')
        .eq('status', 'active')
        .order('name')
      if (data) setClients(data)
    }
    fetchClients()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Reset chat when client or agent changes
  useEffect(() => {
    setMessages([])
  }, [selectedClient?.id, selectedAgent.id])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }])
    setLoading(true)

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage,
          sessionId,
          clientId: selectedClient?.slug || null,
          domain: selectedClient?.domain || selectedClient?.slug || 'general',
          agentType: selectedAgent.id,
        }),
      })

      const data = await res.json()
      const reply = data?.response || data?.message || data?.output || 
        data?.choices?.[0]?.message?.content || 
        (typeof data === 'string' ? data : 'No response received.')

      setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: new Date() }])
    } catch {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Something went wrong. Please try again.', 
        timestamp: new Date() 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-950 text-white overflow-hidden">

      {/* LEFT SIDEBAR */}
      <div className="w-72 flex-shrink-0 border-r border-white/10 flex flex-col bg-gray-900">
        
        {/* Client Selector */}
        <div className="p-4 border-b border-white/10">
          <p className="text-xs font-heading tracking-wider text-white/40 mb-3 uppercase">Client Memory</p>
          <button
            onClick={() => setSelectedClient(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body mb-1 transition-colors ${
              !selectedClient ? 'bg-purple-600 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
             No Client (General)
          </button>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {clients.map(client => (
              <button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                  selectedClient?.id === client.id
                    ? 'bg-purple-600 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#592b77] to-[#8b4b94] inline-flex items-center justify-center text-xs font-bold mr-2">
                  {client.name.charAt(0).toUpperCase()}
                </span>
                {client.name}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Selector */}
        <div className="p-4 flex-1">
          <p className="text-xs font-heading tracking-wider text-white/40 mb-3 uppercase">Agent Type</p>
          <div className="space-y-1">
            {AGENTS.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedAgent.id === agent.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{agent.icon}</span>
                  <div>
                    <p className="text-sm font-heading">{agent.label}</p>
                    <p className="text-xs text-white/40 font-body">{agent.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-gray-900/50">
          <span className="text-2xl">{selectedAgent.icon}</span>
          <div>
            <h2 className="font-heading font-bold text-white">
              {selectedAgent.label} Agent
              {selectedClient && (
                <span className="ml-2 text-purple-400"> {selectedClient.name}</span>
              )}
            </h2>
            <p className="text-xs text-white/40 font-body">
              {selectedClient 
                ? `Using memory for ${selectedClient.name}` 
                : 'No client memory loaded  general mode'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-4xl mb-4">{selectedAgent.icon}</p>
                <p className="text-white/60 font-body">
                  {selectedClient 
                    ? `${selectedAgent.label} Agent loaded with ${selectedClient.name} memory.`
                    : `${selectedAgent.label} Agent ready. No client selected.`}
                </p>
                <p className="text-white/30 text-sm font-body mt-1">Send a message to get started.</p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white rounded-br-sm'
                  : 'bg-white/10 text-white/90 rounded-bl-sm'
              }`}>
                <p className="font-body text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-purple-200' : 'text-white/30'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-white/10 bg-gray-900/50">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${selectedAgent.label} Agent${selectedClient ? ` (${selectedClient.name})` : ''}...`}
              rows={1}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/30 resize-none focus:outline-none focus:border-purple-500 transition-colors"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              onInput={e => {
                const el = e.target as HTMLTextAreaElement
                el.style.height = 'auto'
                el.style.height = Math.min(el.scrollHeight, 120) + 'px'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-white/10 disabled:text-white/30 rounded-xl font-heading text-sm tracking-wider transition-colors flex-shrink-0"
            >
              SEND
            </button>
          </div>
          <p className="text-xs text-white/20 font-body mt-2">Press Enter to send  Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  )
}
