import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  size: string;
  price: string;
  specifications: string[];
  category: string;
}

const sampleProducts: Record<string, Product[]> = {
  hdpe: [
    {
      id: "hdpe-1",
      name: "HDPE Pipe",
      size: "25mm",
      price: "₹45/meter",
      specifications: ["PE-80", "PN-6", "Black color"],
      category: "hdpe"
    },
    {
      id: "hdpe-2",
      name: "HDPE Pipe",
      size: "32mm",
      price: "₹68/meter",
      specifications: ["PE-80", "PN-6", "Black color"],
      category: "hdpe"
    },
    {
      id: "hdpe-3",
      name: "HDPE Elbow",
      size: "25mm",
      price: "₹12/piece",
      specifications: ["90 degree", "Threaded"],
      category: "hdpe"
    },
    {
      id: "hdpe-4",
      name: "HDPE Tee",
      size: "32mm",
      price: "₹18/piece",
      specifications: ["Equal tee", "Compression fitting"],
      category: "hdpe"
    }
  ],
  "bore-casing": [
    {
      id: "bore-1",
      name: "Bore Casing Pipe",
      size: "4 inch",
      price: "₹125/meter",
      specifications: ["MS grade", "Heavy duty", "Threaded"],
      category: "bore-casing"
    },
    {
      id: "bore-2",
      name: "Bore Casing Pipe",
      size: "6 inch",
      price: "₹185/meter",
      specifications: ["MS grade", "Heavy duty", "Threaded"],
      category: "bore-casing"
    },
    {
      id: "bore-3",
      name: "Screen Pipe",
      size: "4 inch",
      price: "₹145/meter",
      specifications: ["Slotted", "Stainless steel"],
      category: "bore-casing"
    }
  ],
  upvc: [
    {
      id: "upvc-1",
      name: "UPVC Pipe",
      size: "20mm",
      price: "₹28/meter",
      specifications: ["Class A", "White color", "PN-10"],
      category: "upvc"
    },
    {
      id: "upvc-2",
      name: "UPVC Pipe",
      size: "25mm",
      price: "₹35/meter",
      specifications: ["Class A", "White color", "PN-10"],
      category: "upvc"
    },
    {
      id: "upvc-3",
      name: "UPVC Elbow",
      size: "20mm",
      price: "₹8/piece",
      specifications: ["90 degree", "Solvent weld"],
      category: "upvc"
    }
  ],
  cpvc: [
    {
      id: "cpvc-1",
      name: "CPVC Pipe",
      size: "15mm",
      price: "₹42/meter",
      specifications: ["Hot water", "Cream color", "PN-16"],
      category: "cpvc"
    },
    {
      id: "cpvc-2",
      name: "CPVC Pipe",
      size: "20mm",
      price: "₹55/meter",
      specifications: ["Hot water", "Cream color", "PN-16"],
      category: "cpvc"
    },
    {
      id: "cpvc-3",
      name: "CPVC Tee",
      size: "15mm",
      price: "₹15/piece",
      specifications: ["Equal tee", "Solvent weld"],
      category: "cpvc"
    }
  ],
  pprc: [
    {
      id: "pprc-1",
      name: "PPRC Pipe",
      size: "20mm",
      price: "₹38/meter",
      specifications: ["Green color", "PN-20", "Hot/Cold water"],
      category: "pprc"
    },
    {
      id: "pprc-2",
      name: "PPRC Pipe",
      size: "25mm",
      price: "₹48/meter",
      specifications: ["Green color", "PN-20", "Hot/Cold water"],
      category: "pprc"
    },
    {
      id: "pprc-3",
      name: "PPRC Coupling",
      size: "20mm",
      price: "₹12/piece",
      specifications: ["Female thread", "Brass insert"],
      category: "pprc"
    }
  ]
};

interface ProductGridProps {
  category: string;
}

export const ProductGrid = ({ category }: ProductGridProps) => {
  const products = sampleProducts[category] || [];

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products available for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 bg-card border border-border">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-card-foreground">{product.name}</CardTitle>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {product.size}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">{product.price}</div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Specifications:</h4>
                <ul className="text-sm space-y-1">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};