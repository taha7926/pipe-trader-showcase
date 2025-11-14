import { useState } from "react";
import { Header } from "@/components/Header";
import { CategorySlider } from "@/components/CategorySlider";
import { CategoryTabs } from "@/components/CategoryTabs";
import CompanyGrid from "@/components/companies/CompanyGrid";
import { PDFPopup } from "@/components/pdf-viewer";
import { CompanyProvider, useCompanies } from "@/contexts/CompanyContext";
import { ProductCategory } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Star, CheckCircle, Users, Award, ArrowRight } from "lucide-react";
import jeddahLogo from "@/assets/Jeddah.png";
import minhasLogo from "@/assets/minhas.png";
import nationalPipeLogo from "@/assets/national pipe.png";
import pakArabLogo from "@/assets/pak_arab_logo.jpeg";
import steelexLogo from "@/assets/steelex_logo.png";
import iilLogo from "@/assets/IIL.png";

const IndexContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("hdpe");
  const { companies, filters, setFilters, loading, selectedCompany, isPDFPopupOpen, closePDFPopup } = useCompanies();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Convert category to filter format
    const categoryMapping: { [key: string]: ProductCategory } = {
      'hdpe': 'HDPE',
      'upvc': 'uPVC',
      'cpvc': 'CPVC',
      'pprc': 'PPRC',
      'bore-casing': 'Bore Casing'
    };
    
    const categoryFilter = categoryMapping[categoryId];
    if (categoryFilter) {
      setFilters({
        ...filters,
        categories: [categoryFilter]
      });
    }
  };

  // Partner logos - duplicate for seamless scrolling
  const partnerLogos = [
    { id: 1, name: "Jeddah", logo: jeddahLogo },
    { id: 2, name: "Minhas", logo: minhasLogo },
    { id: 3, name: "National Pipe", logo: nationalPipeLogo },
    { id: 4, name: "Pak Arab", logo: pakArabLogo },
    { id: 5, name: "Steelex", logo: steelexLogo },
    { id: 6, name: "IIL", logo: iilLogo },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-16">
        
        {/* Hero Value Proposition */}
        <section className="text-center py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Premium <span className="text-primary">Pipes & Fittings</span><br />
              for Every Project
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              From residential to industrial applications, we supply high-quality HDPE, uPVC, CPVC, and PPRC pipes with competitive pricing and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Phone className="h-5 w-5 mr-2" />
                Get Instant Quote
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-200">
                <ArrowRight className="h-5 w-5 mr-2" />
                View Products
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-foreground">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">Premium grade materials</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-foreground">Competitive Pricing</h3>
              <p className="text-sm text-muted-foreground">Best market rates</p>
            </div>
          </div>
        </section>

        {/* Hero Category Slider */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore Our Product Range</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any category to see our complete product lineup
            </p>
          </div>
          <CategorySlider 
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </section>

        {/* Our Partners Section */}
        <section className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl py-12 px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are proud partners with leading manufacturers, ensuring authentic products and reliable supply chains
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="flex animate-scroll">
              {/* Multiple sets for seamless infinite scrolling */}
              {[...Array(4)].map((_, setIndex) => (
                partnerLogos.map((partner) => (
                  <div key={`set-${setIndex}-${partner.id}`} className="flex-shrink-0 mx-4 w-64">
                    <div className="bg-background rounded-lg border border-border p-6 h-36 flex items-center justify-center hover:shadow-md transition-shadow duration-200">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                      />
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Product Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our comprehensive range of high-quality pipes and fittings for all your needs
            </p>
          </div>
          <CategoryTabs 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* Companies Grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground capitalize mb-2">
                {selectedCategory.replace("-", " ")} Companies
              </h3>
              <p className="text-muted-foreground">
                Trusted partners specializing in {selectedCategory.replace("-", " ")} pipes and fittings
              </p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <ArrowRight className="h-4 w-4 mr-2" />
              View All Companies
            </Button>
          </div>
          <CompanyGrid 
            companies={companies}
            filters={filters}
            onFilterChange={setFilters}
            loading={loading}
          />
        </section>

        {/* Contact Cards */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-accent font-semibold text-lg">0335-2906212</p>
                <p className="text-sm text-muted-foreground mt-1">Mon-Sat: 9AM-6PM</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-accent font-semibold">mufaddaltraders553@gmail.com</p>
                <p className="text-sm text-muted-foreground mt-1">Quick response guaranteed</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                <p className="text-foreground font-semibold">Gulbahar No.2, Karachi</p>
                <p className="text-sm text-muted-foreground mt-1">See our showroom</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-white/10 p-2 rounded-full">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Mufaddal Traders</h3>
            </div>
            <p className="text-primary-foreground/90 mb-6 text-base max-w-md mx-auto leading-relaxed">
              Your trusted partner for quality pipes and fittings. Serving the industry with excellence since 2009.
            </p>
            <div className="border-t border-primary-foreground/20 pt-6">
              <p className="text-sm text-primary-foreground/80">
                © 2024 Mufaddal Traders. All rights reserved. • Licensed Dealer
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* PDF Popup */}
      <PDFPopup 
        isOpen={isPDFPopupOpen}
        company={selectedCompany}
        onClose={closePDFPopup}
      />
    </div>
  );
};

const Index = () => {
  return (
    <CompanyProvider>
      <IndexContent />
    </CompanyProvider>
  );
};

export default Index;
