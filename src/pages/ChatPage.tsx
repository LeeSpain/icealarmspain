import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/common/PageHeader';
import SupportChat from '@/components/chat/SupportChat';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatFeedback from '@/components/chat/ChatFeedback';
import { useAuth } from '@/context/auth';

const ChatPage: React.FC = () => {
  const { language } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'support', text: 'Hello! How can I assist you today?' },
    { id: 2, sender: 'user', text: 'I need help with my device setup.' },
  ]);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: language === 'en' ? 'Not authenticated' : 'No autenticado',
        description: language === 'en' ? 'Redirecting to login...' : 'Redirigiendo al inicio de sesión...',
      });
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, language, toast]);

  const handleSendMessage = (newMessage: string) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: 'user', text: newMessage },
    ]);
  };

  const handleSubmitFeedback = (rating: number, comment: string) => {
    console.log('Feedback submitted:', { rating, comment });
    setFeedbackVisible(false);
    toast({
      title: language === 'en' ? 'Feedback Submitted' : 'Comentarios Enviados',
      description: language === 'en' ? 'Thank you for your feedback!' : '¡Gracias por tus comentarios!',
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <PageHeader
          title={language === 'en' ? 'Support Chat' : 'Chat de Soporte'}
          subtitle={language === 'en' ? 'Get help from our support team' : 'Obtén ayuda de nuestro equipo de soporte'}
        />
        <div className="flex flex-col md:flex-row mt-6">
          <div className="md:w-3/4 pr-4">
            <ChatHistory messages={messages} />
            <SupportChat onSendMessage={handleSendMessage} />
          </div>
          <div className="md:w-1/4">
            <button
              onClick={() => setFeedbackVisible(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {language === 'en' ? 'Give Feedback' : 'Dar Comentarios'}
            </button>
          </div>
        </div>
        {feedbackVisible && (
          <ChatFeedback onSubmit={handleSubmitFeedback} onCancel={() => setFeedbackVisible(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
