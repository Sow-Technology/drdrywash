
import { Twitter, Facebook, Instagram, User } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t bg-background pb-16 md:pb-0">
      <div className="container py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Fresh clothes, delivered to your door. Dr. Dry Wash makes laundry day easy.
            </p>
             <div className="text-sm text-muted-foreground">
                <h4 className="font-semibold text-foreground mb-2">Delivery Conditions:</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li>Free pickup & drop for orders above ₹400 within a 5KM radius.</li>
                    <li>Free pickup & drop for all other orders within a 2KM radius.</li>
                </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/stores" className="text-sm text-muted-foreground hover:text-primary transition-colors">Stores</Link></li>
              <li><Link href="/schedule-pickup" className="text-sm text-muted-foreground hover:text-primary transition-colors">Schedule a Pickup</Link></li>
              <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/track-order" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary hover:scale-110 transform transition-all"><Twitter className="h-4 w-4" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary hover:scale-110 transform transition-all"><Facebook className="h-4 w-4" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary hover:scale-110 transform transition-all"><Instagram className="h-4 w-4" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                 <Link href="/billing/login" aria-label="Staff Login" className="text-muted-foreground hover:text-primary hover:scale-110 transform transition-all">
                    <User className="h-4 w-4" />
                 </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dr. Dry Wash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
