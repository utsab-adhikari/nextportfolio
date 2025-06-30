import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function CreditCard() {
  return (
    <Card className="w-full rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle>Credits & Disclaimer</CardTitle>
        <CardDescription>For Educational & Informational Purposes Only</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This platform fetches news from publicly available sources like{" "}
          <a
            href="https://ekantipur.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline inline-flex items-center hover:text-blue-600"
          >
            Ekantipur <ExternalLink className="w-3 h-3 ml-1" />
          </a>{" "}
          and{" "}
          <a
            href="https://kathmandupost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline inline-flex items-center hover:text-blue-600"
          >
            The Kathmandu Post <ExternalLink className="w-3 h-3 ml-1" />
          </a>
          .
        </p>
        <p className="text-sm">
          All news content, headlines, and media belong to their respective publishers. This project is created purely for
          <span className="font-medium"> educational, research, and demonstration purposes</span>. No copyright
          infringement is intended.
        </p>
        <p className="text-sm">
          Please refer to the official websites for the full articles and original content. This platform does not store or
          claim ownership of any third-party data.
        </p>
      </CardContent>
    </Card>
  );
}
