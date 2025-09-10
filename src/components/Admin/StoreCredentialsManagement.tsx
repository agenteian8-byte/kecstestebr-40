import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, Phone, Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStoreCredentials } from "@/hooks/useStoreCredentials";

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

const StoreCredentialsManagement = () => {
  const [credentials, setCredentials] = useState<StoreCredentials>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { 
    credentials: hookCredentials, 
    loading, 
    saveCredentials, 
    loadCredentials 
  } = useStoreCredentials();

  useEffect(() => {
    setCredentials(hookCredentials);
  }, [hookCredentials]);


  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        whatsapp_varejo: credentials.whatsapp_varejo || '',
        whatsapp_revenda: credentials.whatsapp_revenda || '',
        instagram: credentials.instagram || '',
        facebook: credentials.facebook || '',
        twitter: credentials.twitter || '',
        website: credentials.website || '',
      };

      const result = await saveCredentials(dataToSave);

      if (result.success) {
        setCredentials(result.data);
        toast({
          title: "Sucesso",
          description: "Credenciais da loja salvas com sucesso no banco de dados!",
        });
      } else {
        toast({
          title: "Aviso",
          description: "Credenciais salvas localmente. Verifique a conexão com o banco de dados.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar credenciais da loja",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Credenciais da Loja</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Credenciais da Loja
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* WhatsApp Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-500" />
            WhatsApp
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp_varejo">WhatsApp Varejo</Label>
              <Input
                id="whatsapp_varejo"
                type="tel"
                placeholder="Ex: 5585999999999"
                value={credentials.whatsapp_varejo || ''}
                onChange={(e) => handleInputChange('whatsapp_varejo', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Formato: código do país + DDD + número (sem espaços)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_revenda">WhatsApp Revenda</Label>
              <Input
                id="whatsapp_revenda"
                type="tel"
                placeholder="Ex: 5585999999999"
                value={credentials.whatsapp_revenda || ''}
                onChange={(e) => handleInputChange('whatsapp_revenda', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Formato: código do país + DDD + número (sem espaços)
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Social Media Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Redes Sociais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                Instagram
              </Label>
              <Input
                id="instagram"
                type="url"
                placeholder="https://instagram.com/sualoja"
                value={credentials.instagram || ''}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-500" />
                Facebook
              </Label>
              <Input
                id="facebook"
                type="url"
                placeholder="https://facebook.com/sualoja"
                value={credentials.facebook || ''}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter
              </Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/sualoja"
                value={credentials.twitter || ''}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                Website
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://sualoja.com.br"
                value={credentials.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Credenciais'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCredentialsManagement;