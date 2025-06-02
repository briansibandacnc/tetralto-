import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  zipCode: text("zip_code").notNull(),
  message: text("message"),
  serviceType: text("service_type").default("inspection"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const roofAnalyses = pgTable("roof_analyses", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  imagePath: text("image_path").notNull(),
  damageLevel: text("damage_level").notNull(), // "low", "moderate", "high"
  estimatedCost: integer("estimated_cost").notNull(),
  urgencyLevel: text("urgency_level").notNull(), // "routine", "soon", "urgent"
  detectedIssues: text("detected_issues").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertRoofAnalysisSchema = createInsertSchema(roofAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertRoofAnalysis = z.infer<typeof insertRoofAnalysisSchema>;
export type RoofAnalysis = typeof roofAnalyses.$inferSelect;
