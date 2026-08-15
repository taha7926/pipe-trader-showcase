import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Colors = () => {
  const colorCombinations = [
    {
      id: 1,
      name: "Card Themed",
      description: "Directly inspired by your business card design. Blue tile background with dark logo circle and clean white base - perfectly matches your existing brand identity.",
      cardThemed: true,
      colors: {
        primary: "hsl(214, 84%, 45%)",
        accent: "hsl(220, 15%, 25%)",
        secondary: "hsl(210, 40%, 85%)",
        background: "hsl(0, 0%, 98%)"
      }
    },
    {
      id: 2,
      name: "Industrial Steel & Orange",
      description: "Orange is blue's perfect complement. Creates trust (blue) + energy (orange). Perfect for industrial/construction.",
      recommended: true,
      colors: {
        primary: "hsl(214, 84%, 45%)",
        accent: "hsl(25, 95%, 53%)",
        secondary: "hsl(215, 15%, 54%)",
        background: "hsl(0, 0%, 98%)"
      }
    },
    {
      id: 3,
      name: "Blue & Warm Gray with Gold Accents",
      description: "Gold suggests premium quality and reliability. Great for high-end pipe fittings.",
      recommended: false,
      colors: {
        primary: "hsl(214, 84%, 45%)",
        accent: "hsl(45, 96%, 53%)",
        secondary: "hsl(30, 8%, 52%)",
        background: "hsl(0, 0%, 98%)"
      }
    },
    {
      id: 4,
      name: "Blue & Forest Green",
      description: "Analogous colors (blue-green) create harmony. Suggests environmental responsibility and sustainability.",
      recommended: false,
      colors: {
        primary: "hsl(214, 84%, 45%)",
        accent: "hsl(158, 64%, 42%)",
        secondary: "hsl(210, 24%, 87%)",
        background: "hsl(0, 0%, 98%)"
      }
    },
    {
      id: 5,
      name: "Blue & Deep Teal",
      description: "Monochromatic blue family. Very sophisticated and professional.",
      recommended: false,
      colors: {
        primary: "hsl(214, 84%, 45%)",
        accent: "hsl(183, 74%, 38%)",
        secondary: "hsl(200, 25%, 85%)",
        background: "hsl(0, 0%, 98%)"
      }
    },
    {
      id: 6,
      name: "Blue & Burgundy",
      description: "Classic, premium combination. Burgundy adds sophistication and authority.",
      recommended: false,
      colors: {
        primary: "hsl(214, 84%, 45%)",
        accent: "hsl(355, 75%, 42%)",
        secondary: "hsl(215, 15%, 54%)",
        background: "hsl(0, 0%, 98%)"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Color Combinations</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Explore different color combinations that work well with our core blue theme. 
            Each combination is designed to maintain professionalism while adding visual appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {colorCombinations.map((combo) => (
            <Card key={combo.id} className={`relative ${combo.recommended ? 'ring-2 ring-primary' : combo.cardThemed ? 'ring-2 ring-accent' : ''}`}>
              {combo.recommended && (
                <div className="absolute -top-3 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ Recommended
                </div>
              )}
              {combo.cardThemed && (
                <div className="absolute -top-3 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  🎴 Card Themed
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{combo.name}</CardTitle>
                <p className="text-muted-foreground">{combo.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Swatches */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg border shadow-sm mb-2"
                      style={{ backgroundColor: combo.colors.primary }}
                    ></div>
                    <p className="text-xs font-medium">Primary</p>
                    <p className="text-xs text-muted-foreground">
                      {combo.cardThemed ? 'Card Blue' : 'Blue'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg border shadow-sm mb-2"
                      style={{ backgroundColor: combo.colors.accent }}
                    ></div>
                    <p className="text-xs font-medium">Accent</p>
                    <p className="text-xs text-muted-foreground">
                      {combo.cardThemed ? 'Logo Dark' : 'Highlight'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg border shadow-sm mb-2"
                      style={{ backgroundColor: combo.colors.secondary }}
                    ></div>
                    <p className="text-xs font-medium">Secondary</p>
                    <p className="text-xs text-muted-foreground">
                      {combo.cardThemed ? 'Light Blue' : 'Support'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg border shadow-sm mb-2"
                      style={{ backgroundColor: combo.colors.background }}
                    ></div>
                    <p className="text-xs font-medium">Background</p>
                    <p className="text-xs text-muted-foreground">Base</p>
                  </div>
                </div>

                {/* Sample UI Elements */}
                <div className="space-y-4 p-4 rounded-lg border bg-card">
                  <h3 className="font-semibold mb-3">Sample UI Elements</h3>
                  
                  {/* Header Sample */}
                  <div 
                    className="p-4 rounded-lg text-white"
                    style={{ background: `linear-gradient(135deg, ${combo.colors.primary}, ${combo.colors.accent})` }}
                  >
                    <h4 className="font-bold text-lg">Mufaddal Traders</h4>
                    <p className="text-sm opacity-90">Premium Pipes & Fittings Solutions</p>
                  </div>

                  {/* Buttons Sample */}
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: combo.colors.primary }}
                    >
                      Primary Button
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: combo.colors.accent }}
                    >
                      Accent Button
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg border font-medium"
                      style={{ 
                        borderColor: combo.colors.secondary,
                        color: combo.colors.secondary
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>

                  {/* Card Sample */}
                  <div className="p-4 rounded-lg border" style={{ backgroundColor: combo.colors.background }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: combo.colors.accent }}
                      ></div>
                      <h5 className="font-semibold" style={{ color: combo.colors.primary }}>
                        HDPE Pipes
                      </h5>
                    </div>
                    <p className="text-sm" style={{ color: combo.colors.secondary }}>
                      High-quality polyethylene pipes for industrial applications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Implementation Notes */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Best Practices:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use <strong>Primary (Blue)</strong> for main navigation, headers, and key brand elements</li>
                  <li>• Use <strong>Accent color</strong> for call-to-action buttons, highlights, and interactive elements</li>
                  <li>• Use <strong>Secondary color</strong> for text, borders, and supporting elements</li>
                  <li>• Maintain proper contrast ratios for accessibility</li>
                  <li>• Test combinations in different lighting conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Industry Relevance:</h4>
                <p className="text-sm text-muted-foreground">
                  The recommended <strong>Blue + Orange + Steel Gray</strong> combination works exceptionally well for 
                  industrial/construction businesses as it conveys trust (blue), energy and visibility (orange), 
                  and practical professionalism (steel gray).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Colors;