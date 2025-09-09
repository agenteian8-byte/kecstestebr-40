import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Mail, Settings } from 'lucide-react';

const AdminNotice = () => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('admin-notice-dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const dismissNotice = () => {
    localStorage.setItem('admin-notice-dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-orange-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Configuração Importante - Administrador
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={dismissNotice}>
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            <strong>Email de Confirmação:</strong> Para facilitar os testes, recomendamos desabilitar a confirmação de email no Supabase.
          </AlertDescription>
        </Alert>
        
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Como desabilitar a confirmação de email:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Acesse o <a href="https://supabase.com/dashboard/project/btjullcrugzilpnxjoyr/auth/providers" target="_blank" className="text-blue-600 underline">painel do Supabase</a></li>
            <li>Vá em Authentication → Settings</li>
            <li>Desmarque "Enable email confirmations"</li>
            <li>Clique em "Save"</li>
          </ol>
        </div>

        <Alert>
          <AlertDescription>
            <strong>Primeiro Admin:</strong> Após criar o primeiro usuário, você precisará marcar manualmente como admin no banco de dados, alterando <code>is_admin</code> para <code>true</code> na tabela <code>profiles</code>.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AdminNotice;