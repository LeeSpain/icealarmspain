
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, Mail, Phone } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <div className="py-16 bg-ice-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Next Steps for Interested Investors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you are interested in becoming a strategic investor in ICE Alarm, we invite you to get in touch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader className="text-center pb-2">
              <CalendarDays className="h-8 w-8 text-ice-600 mx-auto mb-2" />
              <CardTitle>Schedule a Meeting</CardTitle>
              <CardDescription>Book a call to discuss the investment structure</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pt-2">
              <Button className="bg-ice-600 hover:bg-ice-700 mt-2">Schedule Now</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="text-center pb-2">
              <Mail className="h-8 w-8 text-ice-600 mx-auto mb-2" />
              <CardTitle>Review Our Financials</CardTitle>
              <CardDescription>Access detailed projections & due diligence documents</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pt-2">
              <Button variant="outline" className="mt-2">Request Documents</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="text-center pb-2">
              <Phone className="h-8 w-8 text-ice-600 mx-auto mb-2" />
              <CardTitle>Secure Your Investment</CardTitle>
              <CardDescription>Reserve your stake in this high-growth opportunity</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pt-2">
              <Button variant="outline" className="mt-2">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Get in touch to discuss investment opportunities and receive our detailed investor packet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <Input id="company" placeholder="Your company" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="Tell us about your interest in investing with ICE Alarm" rows={4} />
              </div>
              <Button className="w-full bg-ice-600 hover:bg-ice-700">Submit Inquiry</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-2">ICE Alarm – Secure the Future of AI-Powered Healthcare Monitoring!</h3>
          <p className="text-muted-foreground">Join us in revolutionizing emergency response and health monitoring.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
