import { useState } from "react";
import { Header } from "@/components/Header";
import { CategorySlider } from "@/components/CategorySlider";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductGrid } from "@/components/ProductGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("hdpe");

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Category Slider */}
        <section>
          <CategorySlider 
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </section>

        {/* Category Navigation */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Product Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our comprehensive range of high-quality pipes and fittings for all your industrial and residential needs.
            </p>
          </div>
          <CategoryTabs 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* Products Grid */}
        <section>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground capitalize mb-2">
              {selectedCategory.replace("-", " ")} Products
            </h3>
            <p className="text-muted-foreground">
              Premium quality pipes and fittings with competitive pricing
            </p>
          </div>
          <ProductGrid category={selectedCategory} />
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Need a custom quote or have questions about our products? Contact us today for personalized service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground">03352906212</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground">info@mufaddaltraders.com</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground">Industrial Area</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Mufaddal Traders</h3>
            <p className="text-primary-foreground/90 mb-4">
              Your trusted partner for quality pipes and fittings
            </p>
            <p className="text-sm text-primary-foreground/80">
              © 2024 Mufaddal Traders. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
