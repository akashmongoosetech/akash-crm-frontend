import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadInfoCardProps {
  title: string;
  children: React.ReactNode;
}

export function LeadInfoCard({ title, children }: LeadInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">{children}</CardContent>
    </Card>
  );
}
