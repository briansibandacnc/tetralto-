import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { z } from "zod";

type LeadFormData = z.infer<typeof insertLeadSchema>;

export default function LeadCapture() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      zipCode: "",
      message: "",
      serviceType: "inspection",
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const response = await apiRequest('POST', '/api/leads', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 40 minutes for your free drone inspection.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly at (555) 123-ROOF",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadFormData) => {
    leadMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-tetralto-orange text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get Your Free Roof Analysis
        </motion.h2>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Join 1,200+ satisfied customers who trust Tetralto for precision roof protection
        </motion.p>
        
        <motion.div 
          className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          className="text-gray-900 bg-white border-0 focus:ring-2 focus:ring-tetralto-gold"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Phone Number" 
                          type="tel"
                          className="text-gray-900 bg-white border-0 focus:ring-2 focus:ring-tetralto-gold"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Email Address" 
                          type="email"
                          className="text-gray-900 bg-white border-0 focus:ring-2 focus:ring-tetralto-gold"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="ZIP Code" 
                          className="text-gray-900 bg-white border-0 focus:ring-2 focus:ring-tetralto-gold"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your roofing needs..." 
                        rows={4}
                        className="text-gray-900 bg-white border-0 focus:ring-2 focus:ring-tetralto-gold resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-yellow-200" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit"
                disabled={leadMutation.isPending}
                className="w-full bg-tetralto-gold hover:bg-white text-black font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                {leadMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-drone mr-2"></i>
                    Schedule Free Drone Inspection
                  </>
                )}
              </Button>
            </form>
          </Form>
          
          <p className="text-sm mt-4 opacity-80">✓ No obligation ✓ 40-minute response time ✓ Licensed & insured</p>
        </motion.div>
      </div>
    </section>
  );
}
