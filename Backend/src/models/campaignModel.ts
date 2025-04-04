import mongoose, { Document, Schema } from "mongoose";

export interface Icampaign extends Document
{
    name: string,
    description: string,
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    leads: string[];
    accountIDs: mongoose.Schema.Types.ObjectId[];
}

const campaignSchema = new Schema<Icampaign>(
   {
      name:{
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      status:{
        type: String,
        enum: ["ACTIVE",  "INACTIVE" , "DELETED"],
        default: "ACTIVE",
      },
      leads: [{ 
        type: String 
    }],
    accountIDs: [{ 
        type: Schema.Types.ObjectId, ref: "Account" 
    }],
   },
   {timestamps: true}
);


export const Campaign =  mongoose.model<Icampaign>("Campaign", campaignSchema);
export default Campaign;