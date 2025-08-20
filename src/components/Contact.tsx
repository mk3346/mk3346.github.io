import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  interestedIn: z.string().min(1, "Please select what you're interested in"),
  message: z.string().min(1, "Message is required")
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interestedIn: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          company: data.company,
          interestedIn: data.interestedIn,
          message: data.message,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Let's Start the
            <span className="text-gradient block">
              Conversation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business? Get in touch to discuss how we can 
            work together to achieve your strategic objectives.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div 
            className="rounded-3xl p-12 transition-smooth hover:scale-105 cursor-pointer relative overflow-hidden"
            style={{
              backgroundImage: 'url(/lovable-uploads/b795e320-5ac6-4b1a-8c9b-d746ff0ef58b.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2 text-foreground">Send a Message</h3>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="mt-2 h-12 rounded-2xl border-border/50 bg-background/50 focus:bg-background transition-smooth"
                          placeholder="Your full name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="mt-2 h-12 rounded-2xl border-border/50 bg-background/50 focus:bg-background transition-smooth"
                          placeholder="your.email@company.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Company Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="mt-2 h-12 rounded-2xl border-border/50 bg-background/50 focus:bg-background transition-smooth"
                          placeholder="Your company name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="interestedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Interested In *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="mt-2 h-12 rounded-2xl border-border/50 bg-background/50 focus:bg-background transition-smooth">
                            <SelectValue placeholder="Select your interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="strategic-project">Strategic Project</SelectItem>
                          <SelectItem value="interim-management">Interim Management</SelectItem>
                          <SelectItem value="startup-advisory">Startup Advisory</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={6}
                          className="mt-2 rounded-2xl border-border/50 bg-background/50 focus:bg-background transition-smooth resize-none"
                          placeholder="Tell me about your project or challenge..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-12 text-base rounded-2xl"
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;