import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Smartphone,
  Shield,
  Truck,
  CreditCard
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Benefits section */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
            
              <div>
                <h3 className="font-semibold text-background">Compra Segura</h3>
                <p className="text-sm text-background/70">SSL & Certificações</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-background">Parcele em 12x</h3>
                <p className="text-sm text-background/70">Com acréscimo da taxa da maquineta</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-background">Site Exclusivo</h3>
                <p className="text-sm text-background/70">Ofertas especiais para revendedores</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Kecinforstore
            </h2>
            <p className="text-background/70 mb-6 max-w-md">
              A maior plataforma de e-commerce do Brasil. Milhões de produtos com entrega rápida e segura para todo o país.
            </p>
            
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-background mb-3">Receba ofertas exclusivas</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Seu e-mail" 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Assinar
                </Button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-background mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Eletrônicos</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Casa & Decoração</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Moda</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Beleza</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Esportes</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Livros</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-background mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Meus Pedidos</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-background mb-4">Sobre a Kecinforstore</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Quem Somos</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Investidores</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Sustentabilidade</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Imprensa</a></li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-background/20" />

      {/* Bottom footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/70 text-sm">
            © 2025 Kecinforstore. Todos os direitos reservados.
          </p>
          
          {/* Social media */}
          <div className="flex items-center gap-4">
            <span className="text-background/70 text-sm mr-2">Siga-nos:</span>
            <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
