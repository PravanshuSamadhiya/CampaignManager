
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteCampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  campaignName: string;
}

const DeleteCampaignDialog = ({
  isOpen,
  onClose,
  onConfirm,
  campaignName,
}: DeleteCampaignDialogProps) => {
  const handleDelete = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Delete Campaign</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the campaign "{campaignName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCampaignDialog;
