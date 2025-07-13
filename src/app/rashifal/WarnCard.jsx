import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function WarnCard() {
  return (
      <div className="w-full bg-red-300/10 shadow-md py-3">
      <CardHeader>
        <CardTitle className="text-white">Credits & Disclaimer</CardTitle>
        <CardDescription  className="text-gray-400">For Educational & Informational Purposes Only</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400">
          This platform fetches data from publicly available sources like{" "}
          <a
            href="https://hamropatro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline inline-flex items-center hover:text-blue-600"
          >
            Hamropatro <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </p>
         <p className="text-sm text-gray-200">
          All data, content, and media belong to their respective publishers. This project is created purely for
          <span className="font-medium"> educational, research, and demonstration purposes</span>. No copyright
          infringement is intended.
        </p>
               <p className="text-sm text-gray-200">

          Please refer to the official websites for the full articles and original content. This platform does not store or
          claim ownership of any third-party data.
        </p>
      </CardContent>
    </div>
  );
}
