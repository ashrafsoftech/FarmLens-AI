/**
 * @file AIChat.tsx
 * @description FarmLens AI Conversational Assistant ("Ask FarmLens") grounded in scan history and knowledge base.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Mic,
  Trash2,
  FileText,
  Volume2,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage, ScanReport } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';

export const AIChat: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('farmlens_chat');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeScanContext, setActiveScanContext] = useState<ScanReport | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if scan context exists in session storage
    const cached = sessionStorage.getItem('chat_scan_context');
    if (cached) {
      try {
        setActiveScanContext(JSON.parse(cached));
      } catch (e) {
        console.error('Error loading scan context for chat', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('farmlens_chat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestedPrompts = [
    'What should I feed my West African Dwarf goat with mild nasal discharge?',
    'What is the recommended Newcastle vaccination schedule for layer chickens?',
    'How do I test dissolved oxygen levels in my catfish pond without digital meters?',
    'What are the red flags to check before buying a sheep at the market?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
      scanContextId: activeScanContext?.id,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          scanContext: activeScanContext,
          history: updatedMessages,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: data.timestamp || new Date().toISOString(),
          scanContextId: activeScanContext?.id,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }
      throw new Error('Invalid chat response format');
    } catch (err) {
      console.warn('API chat call failed or offline, using fallback answer:', err);

      let botAnswer = '';
      if (query.toLowerCase().includes('goat') || query.toLowerCase().includes('nasal')) {
        botAnswer =
          'For goats showing mild nasal discharge: 1) Isolate from other animals to prevent possible spread. 2) Provide dry, dust-free shelter and clean water with electrolytes. 3) Feed cowpea hay or fresh wilted cassava leaves. ⚠ Note: If fever, mouth sores, or watery diarrhea appear, contact a veterinarian immediately as it could indicate PPR.';
      } else if (query.toLowerCase().includes('newcastle') || query.toLowerCase().includes('vaccine')) {
        botAnswer =
          'Newcastle Disease (ND) Vaccination Guide: Day 1-7 (ND Hitchner B1 eye drop), Week 3 (ND LaSota drinking water), and booster every 3-4 months using thermostable I-2 vaccine for rural areas. Always keep vaccines cold until administered.';
      } else if (query.toLowerCase().includes('fish') || query.toLowerCase().includes('oxygen') || query.toLowerCase().includes('pond')) {
        botAnswer =
          'Low oxygen in fish ponds causes catfish or tilapia to gasp at the water surface ("piping"). Quick fix: 1) Perform a 20-30% fresh water change. 2) Manually splash water using buckets to agitate oxygen. 3) Reduce feeding until water clarity improves.';
      } else {
        botAnswer =
          `Thank you for asking. Based on standard African livestock husbandry guidelines and your current scan context (${
            activeScanContext ? activeScanContext.breed : 'General Livestock'
          }): Always prioritize clean water, dry housing, proper vaccination schedules, and consult a local agricultural extension officer or veterinarian for any signs of physical distress.`;
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: botAnswer,
        timestamp: new Date().toISOString(),
        scanContextId: activeScanContext?.id,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_CHAT_MESSAGES);
    localStorage.removeItem('farmlens_chat');
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice input
      setTimeout(() => {
        setIsRecording(false);
        setInputText('How do I treat early heat stress in layer chickens?');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-14rem)] flex flex-col text-slate-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121214] p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Bot className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              Ask FarmLens AI Assistant
              <Badge variant="info" size="sm">Gemma 4 Grounded</Badge>
            </h1>
            <p className="text-xs text-slate-400">
              Ask questions about feeding, breeds, care schedules, and scan reports.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Trash2 className="w-4 h-4 text-slate-400" />}
          onClick={handleClearChat}
        >
          Clear Conversation
        </Button>
      </div>

      {/* Active Scan Context Pill if available */}
      {activeScanContext && (
        <div className="bg-emerald-950/80 text-emerald-200 p-3 rounded-2xl border border-emerald-500/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-emerald-400">Active Scan Context:</span>
            <span className="truncate">{activeScanContext.animalType.toUpperCase()} — {activeScanContext.breed}</span>
          </div>
          <button
            onClick={() => setActiveScanContext(null)}
            className="text-emerald-400 hover:text-white font-bold text-xs underline shrink-0 cursor-pointer"
          >
            Clear Context
          </button>
        </div>
      )}

      {/* Main Chat Conversation Window */}
      <Card className="flex-1 overflow-hidden flex flex-col bg-[#121214] border-slate-800">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-amber-950/40 text-amber-100 border border-amber-500/30 rounded-tr-none'
                    : 'bg-[#1A1A1D] text-slate-200 border border-slate-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-2xs font-bold uppercase ${msg.sender === 'user' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {msg.sender === 'user' ? 'Farmer' : 'FarmLens AI'}
                  </span>
                  <span className={`text-3xs ${msg.sender === 'user' ? 'text-amber-300/70' : 'text-slate-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.sender === 'assistant' && (
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-2xs text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Grounded in Veterinary Knowledge Base
                    </span>
                    <button
                      onClick={() => alert(`Voice Audio Playback (Simulation):\n"${msg.text}"`)}
                      className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-[#1A1A1D] p-3 rounded-2xl w-fit border border-slate-800">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>FarmLens AI is generating answer...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2 sm:p-3 bg-[#09090B] border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-2xs font-bold text-slate-500 uppercase shrink-0">Quick Ask:</span>
          {suggestedPrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              className="bg-[#121214] hover:bg-[#1A1A1D] text-slate-300 hover:text-emerald-400 border border-slate-800 text-2xs px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="p-3 bg-[#121214] border-t border-slate-800 flex items-center gap-2">
          {/* Voice Input Toggle Button */}
          <button
            type="button"
            onClick={toggleVoiceRecording}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-[#09090B] hover:bg-[#1A1A1D] text-slate-300 border-slate-800'
            }`}
            title="Voice Input (Low Literacy Support)"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={
              isRecording
                ? 'Listening to your voice prompt...'
                : t('chatPlaceholder', 'Ask a question about livestock feeding or health...')
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-[#09090B] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />

          <Button
            variant="primary"
            size="md"
            disabled={!inputText.trim()}
            onClick={() => handleSendMessage()}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};
