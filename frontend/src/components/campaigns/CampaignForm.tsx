
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Campaign } from "@/types/campaign";

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Omit<Campaign, "id">) => void;
  campaign?: Campaign;
}

const CampaignForm = ({
  isOpen,
  onClose,
  onSubmit,
  campaign,
}: CampaignFormProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<Omit<Campaign, "id">>();
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("INACTIVE");

  useEffect(() => {
    if (campaign) {
      setValue("name", campaign.name);
      setValue("description", campaign.description);
      setStatus(campaign.status);
    } else {
      reset();
      setStatus("INACTIVE");
    }
  }, [campaign, setValue, reset]);

  const handleFormSubmit = (data: Omit<Campaign, "id">) => {
    onSubmit({
      ...data,
      status,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {campaign ? "Edit Campaign" : "Create Campaign"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Campaign name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Campaign description"
                className="min-h-[100px]"
                {...register("description")}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={status === "ACTIVE"}
                onCheckedChange={(checked) => setStatus(checked ? "ACTIVE" : "INACTIVE")}
                className="bg-muted data-[state=checked]:bg-purple"
              />
              <Label htmlFor="isActive">Active Campaign</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-muted-foreground"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple hover:bg-purple/90">
              {campaign ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignForm;
