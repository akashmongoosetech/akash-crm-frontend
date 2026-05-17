import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteLeadModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadName: string;
}

export function DeleteLeadModal({ open, onClose, onConfirm, leadName }: DeleteLeadModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Lead</DialogTitle>
              <DialogDescription className="mt-1">
                Are you sure you want to delete <strong>{leadName}</strong>? This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Lead"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
