
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Campaign } from "@/types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDelete: (campaign: Campaign) => void;
  onToggleStatus: (id: string, newStatus: "ACTIVE" | "INACTIVE") => void;
}

const CampaignCard = ({
  campaign,
  onEdit,
  onDelete,
  onToggleStatus,
}: CampaignCardProps) => {
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(campaign.status);

  const handleToggleStatus = () => {
    const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setStatus(newStatus);
    onToggleStatus(campaign.id, newStatus);
  };

  return (
    <Card className="border-purple/20 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{campaign.name}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
            {status === "ACTIVE" ? "Active" : "Inactive"}
            </span>
            <Switch 
             checked={status === "ACTIVE"}
              onCheckedChange={handleToggleStatus}
              className="bg-muted data-[state=checked]:bg-purple"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{campaign.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(campaign.id)}
              className="border-purple text-purple hover:bg-purple hover:text-white"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(campaign)}
              className="border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
