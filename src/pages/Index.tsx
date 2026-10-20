import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategorySlider } from "@/components/CategorySlider";
import { CategoryTabs } from "@/components/CategoryTabs";
import CompanyGrid from "@/components/companies/CompanyGrid";
import { PDFPopup } from "@/components/pdf-viewer";
import { CompanyProvider, useCompanies } from "@/contexts/CompanyContext";
import { ProductCategory } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  CalendarCheck,
  Layers,
  BadgePercent,
  Truck,
  FileText,
} from "lucide-react";
import {
  ADDRESS,
  DEFAULT_WHATSAPP_MESSAGE,
  EMAIL,
  HOURS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  RATE_LIST_MESSAGE,
  SINCE_YEAR,
  whatsappLink,
} from "@/config/contact";
import jeddahLogo from "@/assets/Logos/Jeddah.png";
import minhasLogo from "@/assets/Logos/minhas.png";
import nationalPipeLogo from "@/assets/Logos/national-pipe.png";
import pakArabLogo from "@/assets/Logos/pak-arab.png";
import steelexLogo from "@/assets/Logos/steelex_logo.png";
import iilLogo from "@/assets/Logos/IIL.png";
import speedLogo from "@/assets/Logos/speed.png";
import markLogo from "@/assets/Logos/Mark.png";
import primeLogo from "@/assets/Logos/Prime.png";

// URL-style category id -> data category + display label
const categoryMapping: Record<string, ProductCategory> = {
  hdpe: "HDPE",
  upvc: "uPVC",
  cpvc: "CPVC",
  pprc: "PPRC",
  "bore-casing": "Bore Casing",
  gi: "G.I",
};

const yearsInBusiness = new Date().getFullYear() - SINCE_YEAR;

const highlights = [
  { icon: CalendarCheck, title: `Since ${SINCE_YEAR}`, text: `${yearsInBusiness}+ years supplying Karachi` },
  { icon: Layers, title: "10+ Brands", text: "Pak Arab, Steelex, IIL, Speed & more" },
  { icon: BadgePercent, title: "Wholesale Rates", text: "For contractors, plumbers & resellers" },
  { icon: Truck, title: "Delivery", text: "Across Karachi; bulk orders nationwide" },
];

// Partner logos - all companies except LOCAL
const partnerLogos = [
  { id: 1, name: "Pak Arab", logo: pakArabLogo },
  { id: 2, name: "National Pipe", logo: nationalPipeLogo },
  { id: 3, name: "Steelex", logo: steelexLogo },
  { id: 4, name: "Speed", logo: speedLogo },
  { id: 5, name: "Jeddah Polymer", logo: jeddahLogo },
  { id: 6, name: "Mark", logo: markLogo },
  { id: 7, name: "Minhas", logo: minhasLogo },
  { id: 8, name: "IIL", logo: iilLogo },
  { id: 9, name: "Prime", logo: primeLogo },
];

const IndexContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("hdpe");
  const { companies, filters, setFilters, loading, selectedCompany, selectedCategory: pdfCategory, isPDFPopupOpen, closePDFPopup } = useCompanies();

  // Initialize filter on mount
  useEffect(() => {
    const categoryFilter = categoryMapping[selectedCategory];
    if (categoryFilter) {
      setFilters({ categories: [categoryFilter] });
    }
  }, []); // Run only on mount

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryFilter = categoryMapping[categoryId];
    if (categoryFilter) {
      setFilters({ categories: [categoryFilter] });
    }
  };

  const categoryLabel = categoryMapping[selectedCategory] ?? selectedCategory;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-16">

        {/* Hero Value Proposition */}
        <section className="text-center pt-8 md:pt-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Pipes &amp; Fittings <span className="text-primary">at Wholesale Rates</span>
              <br />
              in Karachi
            </h1>
            <p lang="ur" dir="rtl" className="text-2xl md:text-3xl font-semibold text-primary mb-6 leading-relaxed">
              پانی، زرعی، بورنگ اور کیبل پائپ — ہول سیل ریٹ پر
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              HDPE, uPVC, CPVC, PPRC, G.I and bore casing pipes from Pakistan&apos;s leading brands — for homes,
              farms, housing projects and industry. Serving contractors and plumbers since {SINCE_YEAR}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#1ebe5a] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                  Get Quote on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-200" asChild>
                <a href={PHONE_TEL}>
                  <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <span lang="ur" dir="rtl">واٹس ایپ پر ریٹ معلوم کریں</span> · {HOURS}
            </p>
          </div>
        </section>

        {/* Trust Indicators */}
        <section aria-label="Why buy from us">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                </div>
                <h2 className="font-bold text-lg text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hero Category Slider */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore Our Product Range</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a category to see the brands we stock
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Brands We Stock</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Genuine products from Pakistan&apos;s leading pipe manufacturers
            </p>
          </div>

          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="flex animate-scroll">
              {/* Multiple sets for seamless infinite scrolling */}
              {[...Array(4)].map((_, setIndex) => (
                partnerLogos.map((partner) => (
                  <div
                    key={`set-${setIndex}-${partner.id}`}
                    className="flex-shrink-0 mx-4 w-64"
                    aria-hidden={setIndex > 0}
                  >
                    <div className="bg-background rounded-lg border border-border p-6 h-36 flex items-center justify-center hover:shadow-md transition-shadow duration-200">
                      <img
                        src={partner.logo}
                        alt={setIndex === 0 ? `${partner.name} logo` : ""}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                      />
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section id="products" className="scroll-mt-28">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Product Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse pipes and fittings by material
            </p>
          </div>
          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategorySelect}
          />
        </section>

        {/* Companies Grid */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {categoryLabel} Brands
            </h2>
            <p className="text-muted-foreground">
              Brands we stock for {categoryLabel} pipes and fittings — tap a brand for photos and rates
            </p>
          </div>
          <CompanyGrid
            companies={companies}
            filters={filters}
            onFilterChange={setFilters}
            loading={loading}
          />
        </section>

        {/* Rate list CTA */}
        <section className="rounded-xl border-2 border-accent/30 bg-accent/5 p-8 text-center">
          <FileText className="h-10 w-10 text-accent mx-auto mb-3" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Get Today&apos;s Rate List</h2>
          <p lang="ur" dir="rtl" className="text-lg text-primary font-semibold mb-3">آج کی ریٹ لسٹ حاصل کریں</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Pipe prices change with the market. Message us on WhatsApp with the type, size and quantity you need,
            and we&apos;ll send current wholesale rates for all brands.
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold px-8 py-6 text-lg" asChild>
            <a href={whatsappLink(RATE_LIST_MESSAGE)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" aria-hidden="true" />
              Request Rate List
            </a>
          </Button>
        </section>

        {/* About */}
        <section id="about" className="max-w-4xl mx-auto scroll-mt-28">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">About Mufaddal Traders</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-center md:text-left">
            <p>
              Mufaddal Traders has supplied pipes and fittings from our shop in Gulbahar No. 2, Karachi since{" "}
              {SINCE_YEAR}. We stock uPVC, CPVC, HDPE, PPRC, G.I and bore casing pipes, plus fittings and valves,
              from brands including Pak Arab, Steelex, National Pipe, IIL, Speed, Minhas, Jeddah Polymer, Mark and Prime.
            </p>
            <p>
              Our customers include building contractors, plumbers, farmers, boring and well drillers, and housing
              projects. Not sure which pipe or pressure class you need? Call or message us and we&apos;ll help you choose.
            </p>
          </div>
          <div className="text-center mt-6">
            <Link to="/pipes-fittings-supplier-karachi" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Read our pipe buying guide &amp; FAQ <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Contact Cards */}
        <section aria-label="Contact" className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <a href={PHONE_TEL} className="text-accent font-semibold text-lg hover:underline block">
                  {PHONE_DISPLAY}
                </a>
                <p className="text-sm text-muted-foreground mt-1">{HOURS}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="bg-[#25D366]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-[#25D366]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-semibold text-lg hover:underline block"
                >
                  Chat now
                </a>
                <p className="text-sm text-muted-foreground mt-1">Fastest way to get rates</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6 flex flex-col items-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <a href={`mailto:${EMAIL}`} className="text-accent font-semibold hover:underline text-center break-all">
                  {EMAIL}
                </a>
                <p className="text-sm text-muted-foreground mt-1">For tenders &amp; bulk orders</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-accent/50 transition-colors duration-200">
              <CardContent className="pt-8 pb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline"
                >
                  {ADDRESS}
                </a>
                <p className="text-sm text-muted-foreground mt-1">Open in Google Maps</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      {/* PDF Popup */}
      <PDFPopup
        isOpen={isPDFPopupOpen}
        company={selectedCompany}
        selectedCategory={pdfCategory || undefined}
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
