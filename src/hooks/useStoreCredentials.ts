import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface StoreCredentials {
  whatsapp_varejo?: string;
  whatsapp_revenda?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
}

export const useStoreCredentials = () => {
  const [credentials, setCredentials] = useState<StoreCredentials>({});
  const { profile } = useAuth();

  useEffect(() => {
    const loadCredentials = () => {
      try {
        const saved = localStorage.getItem('store_credentials');
        if (saved) {
          setCredentials(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Erro ao carregar credenciais:', error);
      }
    };

    loadCredentials();
  }, []);

  const getWhatsAppNumber = () => {
    // Se o usuário está logado e é do setor revenda, usa o número de revenda
    if (profile?.setor === 'revenda' && credentials.whatsapp_revenda) {
      return credentials.whatsapp_revenda;
    }
    
    // Caso contrário (varejo ou sem login), usa o número de varejo
    return credentials.whatsapp_varejo || '';
  };

  const redirectToWhatsApp = (message?: string) => {
    const number = getWhatsAppNumber();
    if (!number) {
      alert('Número do WhatsApp não configurado. Entre em contato com o administrador.');
      return;
    }

    const defaultMessage = encodeURIComponent(
      message || 'Olá! Gostaria de mais informações sobre os produtos.'
    );
    
    const whatsappUrl = `https://wa.me/${number}?text=${defaultMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return {
    credentials,
    getWhatsAppNumber,
    redirectToWhatsApp,
    currentSector: profile?.setor || 'varejo'
  };
};