import { Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabasePublic as supabase } from "@/integrations/supabase/publicClient";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface HeaderProps {
  onAuthClick: () => void;
  onAdminClick: () => void;
  searchTerm: string;
  selectedCategory: string;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
}

const Header = ({ 
  onAuthClick, 
  onAdminClick, 
  searchTerm, 
  selectedCategory, 
  onSearchChange, 
  onCategoryChange 
}: HeaderProps) => {
  const { user, profile, signOut } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Categories error:', error);
        setCategories([]);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          <span>Os melhores produtos em tecnologia • Preços especiais para revenda</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              KECINFORSTORE
            </h1>
          </div>

          {/* Search and Filters */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex gap-2">
              {/* Search Input - Mobile: Icon only, Desktop: Full */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => {
                    console.log('🔍 Search input changed:', e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  onInput={(e) => {
                    console.log('🔍 Search input event:', e.currentTarget.value);
                    onSearchChange(e.currentTarget.value);
                  }}
                  className="pl-10 h-10 sm:placeholder:opacity-100 placeholder:opacity-0 touch-manipulation"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>

              {/* Category Filter - Hidden on mobile, shown on tablet+ */}
              <div className="hidden sm:block min-w-[140px]">
                <Select 
                  value={selectedCategory} 
                  onValueChange={(value) => {
                    console.log('🏷️ Category selected in header:', value);
                    onCategoryChange(value);
                  }}
                >
                  <SelectTrigger className="h-10 touch-manipulation">
                    <SelectValue placeholder="Categorias" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-md z-50 max-h-60 overflow-y-auto">
                    <SelectItem value="all">Todas</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center gap-2">
            {user && profile ? (
              <div className="flex items-center gap-2">
                <div className="text-sm hidden sm:block">
                  <span className="text-muted-foreground">Olá, </span>
                  <span className="font-medium">{profile.email}</span>
                  {profile.is_admin && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      Admin
                    </span>
                  )}
                </div>
                {profile.is_admin && (
                  <Button variant="outline" size="sm" onClick={onAdminClick} className="hidden sm:inline-flex">
                    Painel Admin
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🔑 Auth button clicked');
                  onAuthClick();
                }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground touch-manipulation"
                size="sm"
              >
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Login Revenda</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;