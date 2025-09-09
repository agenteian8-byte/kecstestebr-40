import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import SearchAndFilters from '@/components/SearchAndFilters';
import ProductList from '@/components/ProductList';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import BannerCarousel from '@/components/BannerCarousel';
import ChatBot from '@/components/ChatBot';
import AuthPage from '@/components/Auth/AuthPage';
import AdminDashboard from '@/components/Admin/AdminDashboard';


const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleSearchChange = (term: string) => {
    console.log('📝 Index - Search term changed:', term);
    setSearchTerm(term);
  };
  
  const handleCategoryChange = (category: string) => {
    console.log('📝 Index - Category changed:', category);
    setSelectedCategory(category);
  };

  if (showAuth) {
    return <AuthPage onBack={() => setShowAuth(false)} />;
  }

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />;
  }

  
  return (
    <div className="min-h-screen bg-background">
      <Header
        onAuthClick={() => {
          console.log('🔑 Index - Auth clicked');
          setShowAuth(true);
        }}
        onAdminClick={() => {
          console.log('👑 Index - Admin clicked');
          setShowAdmin(true);
        }}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      
      <BannerCarousel />
      
      <FeaturedProducts />
      
      <main className="container mx-auto px-4 py-8">        
        <ProductList
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </main>

      <CategoriesSection onCategorySelect={handleCategoryChange} />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;