import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertRoofAnalysisSchema } from "@shared/schema";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Lead management endpoints
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.json(lead);
    } catch (error) {
      res.status(400).json({ message: "Invalid lead data", error });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads", error });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lead = await storage.getLead(id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead", error });
    }
  });

  // AI Roof Analysis endpoints
  app.post("/api/roof-analysis", upload.single('roofImage'), async (req, res) => {
    try {
      // Mock AI analysis simulation
      const mockAnalysis = {
        damageLevel: ["low", "moderate", "high"][Math.floor(Math.random() * 3)],
        estimatedCost: Math.floor(Math.random() * 10000) + 1000,
        urgencyLevel: ["routine", "soon", "urgent"][Math.floor(Math.random() * 3)],
        detectedIssues: [
          "Missing shingles",
          "Granule loss",
          "Cracked flashing",
          "Gutter damage"
        ].slice(0, Math.floor(Math.random() * 4) + 1)
      };

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analysisData = {
        leadId: req.body.leadId ? parseInt(req.body.leadId) : null,
        imagePath: req.file?.path || 'mock-image-path',
        ...mockAnalysis
      };

      const analysis = await storage.createRoofAnalysis(analysisData);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Analysis failed", error });
    }
  });

  app.get("/api/roof-analysis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getRoofAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analysis", error });
    }
  });

  // Statistics endpoint for live counters
  app.get("/api/stats", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const stats = {
        totalProjects: 1247,
        customerSatisfaction: 98.7,
        warrantyYears: 25,
        insuranceClaims: 2100000,
        emergencyResponse: 40,
        leadsGenerated: leads.length
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
