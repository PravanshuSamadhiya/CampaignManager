import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter } from "lucide-react";
import CampaignCard from "@/components/campaigns/CampaignCard";
import CampaignForm from "@/components/campaigns/CampaignForm";
import DeleteCampaignDialog from "@/components/campaigns/DeleteCampaignDialog";
import { useToast } from "@/hooks/use-toast";
import { Campaign } from "@/types/campaign";


const API_URL = "https://campaignmanagerapp.vercel.app/campaigns";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  
  const { toast } = useToast();
  

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const mappedCampaigns = data
          .filter((campaign: any) => campaign.status !== "DELETED")
          .map((campaign: any) => ({
            ...campaign,
            id: campaign._id, 
          }));
  
        setCampaigns(mappedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast({ title: "Error", description: "Failed to load campaigns." });
      }
    };
  
    fetchCampaigns();
  }, []);
  


  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showActiveOnly ? campaign.status === "ACTIVE" : true;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCampaign = () => {
    setCurrentCampaign(undefined);
    setIsFormOpen(true);
  };

  const handleEditCampaign = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setCurrentCampaign(campaign);
      setIsFormOpen(true);
    }
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
      setCampaignToDelete(campaign);
      setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCampaign = () => {
    if (!campaignToDelete) {
      console.log("No campaign selected for deletion");
      return;
    }

    fetch(`${API_URL}/${campaignToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCampaigns(campaigns.filter((c) => c.id !== campaignToDelete.id));
        toast({
          title: "Campaign Deleted",
          description: `${campaignToDelete.name} has been deleted.`,
        });
        setCampaignToDelete(null);
      })
      .catch((err) => {
        console.error("Delete failed", err);
      });
  };
  
  

  const handleToggleStatus = async (id: string, newStatus: "ACTIVE" | "INACTIVE") => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, staus: newStatus } : campaign
      )
    );
    const campaignName = campaigns.find(c => c.id === id)?.name || "Campaign";
    toast({
      title: newStatus === "ACTIVE" ? "Campaign Activated" : "Campaign Deactivated",
      description: `${campaignName} has been ${newStatus === "ACTIVE" ? "activated" : "deactivated"}.`,
    });
  };

  const handleSubmitCampaign = async(formData: Omit<Campaign, "id">) => {
    if (currentCampaign) {
      const res = await fetch(`${API_URL}/${currentCampaign.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update");
      setCampaigns(
        campaigns.map((c) => (c.id === currentCampaign.id ? { ...formData, id: c.id } : c))
      );
      toast({
        title: "Campaign Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newCampaign = await response.json();
      setCampaigns([...campaigns, newCampaign]);
      toast({
        title: "Campaign Created",
        description: `${formData.name} has been created successfully.`,
      });
      setIsFormOpen(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaign Dashboard</h1>
        <Button onClick={handleCreateCampaign} className="bg-purple hover:bg-purple/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className={`border-purple ${showActiveOnly ? 'bg-purple text-white' : 'bg-white text-[#643969]'}`}
          onClick={() => setShowActiveOnly(!showActiveOnly)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {showActiveOnly ? "Show All" : "Active Only"}
        </Button>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-lg border-muted">
          <p className="text-muted-foreground">No campaigns found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={handleEditCampaign}
              onDelete={handleDeleteCampaign}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      <CampaignForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitCampaign}
        campaign={currentCampaign}
      />

      {campaignToDelete && (
        <DeleteCampaignDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDeleteCampaign}
          campaignName={campaignToDelete.name}
        />
      )}
    </Layout>
  );
};

export default Dashboard;
