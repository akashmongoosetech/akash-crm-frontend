import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { crmService } from "@/lib/crm-service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { toast } from "sonner";

interface Note {
  text: string;
  user: string;
  createdAt: string;
}

interface LeadNotesSectionProps {
  leadId: string;
  notes: Note[];
  onNoteAdded: (newNote: Note) => void;
}

export function LeadNotesSection({ leadId, notes, onNoteAdded }: LeadNotesSectionProps) {
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addNote = async () => {
    if (!newNote.trim()) return;
    setIsAdding(true);
    try {
      await crmService.addNote(leadId, newNote);
      const noteDate = new Date().toISOString();
      // We don't know the user name here, so we'll rely on the refetch or just optimistic update
      // For now, let's just optimistic update with "You"
      onNoteAdded({
        text: newNote,
        user: "You",
        createdAt: noteDate,
      });
      setNewNote("");
    } catch (error) {
      toast.error("Failed to add note");
    } finally {
      setIsAdding(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div id="notes-section" className="rounded-xl border bg-card p-6">
      <h3 className="font-semibold mb-4">Notes</h3>

      <div className="space-y-4 mb-4 max-h-72 overflow-auto pr-1">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No notes added yet.</p>
        ) : (
          notes.map((note, idx) => (
            <div key={idx} className="flex gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">
                  {getInitials(note.user)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{note.user}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {format(new Date(note.createdAt), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{note.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={2}
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={addNote} disabled={!newNote.trim() || isAdding}>
            {isAdding ? "Adding..." : "Add Note"}
          </Button>
        </div>
      </div>
    </div>
  );
}
