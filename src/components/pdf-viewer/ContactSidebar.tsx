import React from 'react';
import { Phone, Mail, MapPin, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Company } from '@/types/company';

interface ContactSidebarProps {
  company: Company;
  onRequestQuote?: () => void;
  onDownloadCatalog?: () => void;
  className?: string;
}

const ContactSidebar: React.FC<ContactSidebarProps> = ({
  company,
  onRequestQuote,
  onDownloadCatalog,
  className = ""
}) => {
  const handleCall = () => {
    // In a real app, this would use the company's actual phone number
    window.location.href = 'tel:03352906212';
  };

  const handleEmail = () => {
    // In a real app, this would use the company's actual email
    window.location.href = 'mailto:mufaddaltraders553@gmail.com?subject=Inquiry about ' + company.name;
  };

  const handleLocation = () => {
    // In a real app, this would open Google Maps with the company's location
    window.open('https://maps.app.goo.gl/fa9XVhYD4XTLCNLA7', '_blank');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Company Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-12 w-12 object-contain rounded border"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              <h3 className="font-semibold text-foreground">{company.name}</h3>
              <p className="text-sm text-muted-foreground">
                {company.categories.join(', ')} Specialist
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {company.description}
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://wa.me/message/AZLLSHJVYUYJP1', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Request Quote
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onDownloadCatalog}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Catalog
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-4">Contact Information</h4>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={handleCall}
            >
              <Phone className="h-4 w-4 mr-3 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium">Call Now</div>
                <div className="text-xs text-muted-foreground">0335-2906212</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={handleEmail}
            >
              <Mail className="h-4 w-4 mr-3 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium">Send Email</div>
                <div className="text-xs text-muted-foreground">Quick response guaranteed</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={handleLocation}
            >
              <MapPin className="h-4 w-4 mr-3 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium">Visit Showroom</div>
                <div className="text-xs text-muted-foreground">Gulbahar No.2, Karachi</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Categories */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-4">Product Specialization</h4>
          <div className="flex flex-wrap gap-2">
            {company.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {category}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSidebar;