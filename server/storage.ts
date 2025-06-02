import { users, leads, roofAnalyses, type User, type InsertUser, type Lead, type InsertLead, type RoofAnalysis, type InsertRoofAnalysis } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createRoofAnalysis(analysis: InsertRoofAnalysis): Promise<RoofAnalysis>;
  getRoofAnalysis(id: number): Promise<RoofAnalysis | undefined>;
  getRoofAnalysesByLead(leadId: number): Promise<RoofAnalysis[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async createRoofAnalysis(insertAnalysis: InsertRoofAnalysis): Promise<RoofAnalysis> {
    const [analysis] = await db
      .insert(roofAnalyses)
      .values(insertAnalysis)
      .returning();
    return analysis;
  }

  async getRoofAnalysis(id: number): Promise<RoofAnalysis | undefined> {
    const [analysis] = await db.select().from(roofAnalyses).where(eq(roofAnalyses.id, id));
    return analysis || undefined;
  }

  async getRoofAnalysesByLead(leadId: number): Promise<RoofAnalysis[]> {
    return await db.select().from(roofAnalyses).where(eq(roofAnalyses.leadId, leadId));
  }
}

export const storage = new DatabaseStorage();
