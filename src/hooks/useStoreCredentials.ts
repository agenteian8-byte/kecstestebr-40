import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface StoreCredentials {
  id?: string;
  whatsapp_varejo?: string;
  whatsapp_revenda?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

export const useStoreCredentials = () => {
  const [credentials, setCredentials] = useState<StoreCredentials>({});
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      setLoading(true);
      
      // Primeiro tenta carregar do Supabase usando um client genérico
      try {
        const { data, error } = await (supabase as any)
          .from('store_credentials')
          .select('*')
          .maybeSingle();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Erro ao carregar credenciais do Supabase:', error);
          throw error;
        } else if (data) {
          setCredentials(data);
          return;
        }
      } catch (supabaseError) {
        console.log('Tabela store_credentials ainda não existe no Supabase, usando localStorage');
      }
      
      // Fallback para localStorage
      const saved = localStorage.getItem('store_credentials');
      if (saved) {
        setCredentials(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erro ao carregar credenciais:', error);
      
      // Último fallback para localStorage em caso de erro
      try {
        const saved = localStorage.getItem('store_credentials');
        if (saved) {
          setCredentials(JSON.parse(saved));
        }
      } catch (localError) {
        console.error('Erro no localStorage:', localError);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveCredentials = async (newCredentials: StoreCredentials) => {
    const dataToSave = {
      whatsapp_varejo: newCredentials.whatsapp_varejo || '',
      whatsapp_revenda: newCredentials.whatsapp_revenda || '',
      instagram: newCredentials.instagram || '',
      facebook: newCredentials.facebook || '',
      twitter: newCredentials.twitter || '',
      website: newCredentials.website || '',
    };

    try {
      // Tenta salvar no Supabase usando um client genérico
      const { data: existingData } = await (supabase as any)
        .from('store_credentials')
        .select('id')
        .maybeSingle();

      let result;
      if (existingData) {
        // Update existing record
        result = await (supabase as any)
          .from('store_credentials')
          .update(dataToSave)
          .eq('id', existingData.id)
          .select()
          .single();
      } else {
        // Insert new record
        result = await (supabase as any)
          .from('store_credentials')
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      setCredentials(result.data);
      
      // Também salva no localStorage como backup
      localStorage.setItem('store_credentials', JSON.stringify(dataToSave));
      
      return { success: true, data: result.data };
    } catch (error) {
      console.error('Erro ao salvar no Supabase (tabela pode não existir ainda):', error);
      
      // Fallback: salva apenas no localStorage
      localStorage.setItem('store_credentials', JSON.stringify(dataToSave));
      setCredentials({ ...credentials, ...dataToSave });
      
      return { success: false, error };
    }
  };

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
    loading,
    saveCredentials,
    loadCredentials,
    getWhatsAppNumber,
    redirectToWhatsApp,
    currentSector: profile?.setor || 'varejo'
  };
};