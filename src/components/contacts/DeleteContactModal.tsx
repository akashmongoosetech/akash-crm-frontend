import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteContactModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName: string;
}

export function DeleteContactModal({
  open,
  onClose,
  onConfirm,
  contactName,
}: DeleteContactModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Contact</DialogTitle>
              <DialogDescription className="mt-1">
                Are you sure you want to delete <strong>{contactName}</strong>? This action
                cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Contact"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
