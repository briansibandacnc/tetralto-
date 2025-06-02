import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AnalysisResult {
  damageLevel: string;
  estimatedCost: number;
  urgencyLevel: string;
  detectedIssues: string[];
}

export default function AIAnalyzer() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'complete'>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('roofImage', file);
      
      setUploadStatus('analyzing');
      const response = await apiRequest('POST', '/api/roof-analysis', formData);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setUploadStatus('complete');
    },
    onError: () => {
      setUploadStatus('idle');
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      analysisMutation.mutate(file);
    }
  };

  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleFileUpload;
    input.click();
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-500';
      case 'soon': return 'text-orange-500';
      default: return 'text-green-500';
    }
  };

  const getDamageLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-500';
      case 'moderate': return 'text-tetralto-orange';
      default: return 'text-green-500';
    }
  };

  return (
    <section id="analyzer" className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <i className="fas fa-brain text-tetralto-orange mr-3"></i>
            AI Roof Expert Analyzer
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a photo of your roof and get instant AI-powered damage detection with repair cost estimates
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Upload Interface */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div 
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                uploadStatus === 'idle' ? 'border-tetralto-terracotta hover:border-tetralto-orange' : 'border-gray-300'
              }`}
              onClick={uploadStatus === 'idle' ? triggerFileUpload : undefined}
            >
              {uploadStatus === 'idle' && (
                <>
                  <i className="fas fa-cloud-upload-alt text-6xl text-tetralto-terracotta mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Roof Photo</h3>
                  <p className="text-gray-600 mb-6">Drag and drop or click to select</p>
                  <Button className="bg-tetralto-teal hover:bg-tetralto-orange text-white">
                    Choose File
                  </Button>
                </>
              )}
              
              {uploadStatus === 'analyzing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fas fa-spinner fa-spin text-6xl text-tetralto-teal mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Roof...</h3>
                  <p className="text-gray-600">AI processing in progress</p>
                </motion.div>
              )}
              
              {uploadStatus === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">Analysis Complete!</h3>
                  <p className="text-gray-600">See results below</p>
                </motion.div>
              )}
            </div>
            
            {/* Analysis Results */}
            {analysisResult && (
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Analysis Complete</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Damage Severity:</span>
                        <span className={`font-semibold capitalize ${getDamageLevelColor(analysisResult.damageLevel)}`}>
                          {analysisResult.damageLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Repair Cost:</span>
                        <span className="font-semibold text-tetralto-teal">
                          ${analysisResult.estimatedCost.toLocaleString()} - ${(analysisResult.estimatedCost * 1.3).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Urgency Level:</span>
                        <span className={`font-semibold capitalize ${getUrgencyColor(analysisResult.urgencyLevel)}`}>
                          {analysisResult.urgencyLevel === 'urgent' ? 'Address Immediately' : 
                           analysisResult.urgencyLevel === 'soon' ? 'Address Within 30 Days' : 
                           'Routine Maintenance'}
                        </span>
                      </div>
                      {analysisResult.detectedIssues.length > 0 && (
                        <div>
                          <span className="font-semibold">Detected Issues:</span>
                          <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                            {analysisResult.detectedIssues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full mt-6 bg-tetralto-orange hover:bg-tetralto-gold text-white hover:text-black"
                      onClick={() => {
                        const element = document.getElementById('contact');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get Full Professional Inspection
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
          
          {/* Sample Analysis Display */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://pixabay.com/get/g01324c29a440c556c1fc363121a79686f6be3c765dd86852df08f53c3c67a225eea028c4591463e8b8d69c6472d5b1b2caf48f74534bd69580b42c46d7e2e817_1280.jpg" 
              alt="Residential roof with shingle damage visible" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
            
            {/* Damage Detection Overlays */}
            <motion.div 
              className="absolute top-1/4 left-1/3 w-16 h-16 border-4 border-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/4 w-12 h-12 border-4 border-orange-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Analysis Label */}
            <motion.div 
              className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-exclamation-triangle text-yellow-400 mr-2"></i>
              3 Issues Detected
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
