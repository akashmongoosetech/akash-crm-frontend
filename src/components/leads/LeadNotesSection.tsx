import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function LeadNotesSection() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Initial contact made. Very interested in enterprise plan.",
      date: "May 14, 2026",
    },
    { id: 2, text: "Follow-up call scheduled for next week.", date: "May 15, 2026" },
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, date: "Just now" }, ...notes]);
    setNewNote("");
  };

  return (
    <div id="notes-section" className="rounded-xl border bg-card p-6">
      <h3 className="font-semibold mb-4">Notes</h3>

      <div className="space-y-3 mb-4 max-h-48 overflow-auto pr-1">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg bg-muted/50 p-3 text-sm">
            <p>{note.text}</p>
            <div className="text-xs text-muted-foreground mt-1">{note.date}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={2}
        />
        <Button size="sm" onClick={addNote} disabled={!newNote.trim()}>
          Add Note
        </Button>
      </div>
    </div>
  );
}
