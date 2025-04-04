import { Request, Response } from "express";
import  Campaign  from "../models/campaignModel";


// GET ALL CAMPAIGN THROUGH THIS
export const getCampaign = async (req: Request, res: Response) => {
    try {
        const campaigns = await Campaign.find({
            status: { $ne: "DELETED" }
        });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

// GET CAMPAIGN BY ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaign = await Campaign.findOne({ _id: req.params.id, status: { $ne: "DELETED" } });
      if (!campaign || campaign.status === "DELETED") {
       res.status(404).json({ error: "Campaign not found" });
       return;
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  


// CREATE CAMPAIGN
export const createCampaign = async (req: Request, res: Response) => {
    try {
        const { name, description, leads, accountIDs } = req.body;
        const newCampaign = new Campaign({ name, description, leads, accountIDs });
        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

// UPDATE THE CAMPAIGN BY ID
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign || campaign.status === "DELETED") {
          res.status(404).json({ error: "Campaign not found" });
          return;
        }
        Object.assign(campaign, req.body);
        await campaign.save();
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

// DELETE THE CAMPAIGN
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
           res.status(404).json({ error: "Campaign not found" });
           return;
        }
        campaign.status = "DELETED";
        await campaign.save();
        res.json({ message: "Campaign deleted (soft delete)" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}