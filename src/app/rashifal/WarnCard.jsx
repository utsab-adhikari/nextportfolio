import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react"; // Ensure lucide-react is installed

export default function WarnCard() {
  return (
    // Main container for the card, adjusted for the dark/indigo theme
    // bg-indigo-900/40 matches the rashifal cards for consistency
    // border and shadow enhance the spiritual/mystical feel
    <div className="w-full max-w-4xl mx-auto my-12 p-4 rounded-xl
                    bg-indigo-900/40 backdrop-blur-sm shadow-2xl
                    border border-indigo-700/50 text-gray-100">
      <CardHeader className="pb-4">
        {/* Card Title: Prominent yellow for emphasis */}
        <CardTitle className="text-3xl font-bold text-yellow-300 mb-2">
          Credits & Disclaimer
        </CardTitle>
        {/* Card Description: Lighter yellow for secondary info */}
        <CardDescription className="text-lg text-yellow-100 opacity-80">
          For Educational & Informational Purposes Only
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-base text-gray-200">
        <p>
          This platform fetches daily horoscope from publicly available sources.</p>
        <p>
          This site makes use of astrology data fetched through unofficial access to{" "}
          <a
            href="https://www.hamropatro.com"
            target="_blank"
            rel="noopener noreferrer"
            // Link styling: vibrant yellow, underlined, with hover effect
            className="underline inline-flex items-center text-yellow-400 hover:text-yellow-200 transition-colors duration-200"
          >
            Hamro Patro <ExternalLink className="w-4 h-4 ml-1 inline-block" />
          </a>{" "}
          for displaying daily{" "}
          {/* Highlighted text: Changed from red to a prominent yellow/orange for theme consistency */}
          <span className="font-medium text-orange-400 dark:text-orange-300">Rashifal</span> content.
        </p>
        <p>
          All data belongs to their respective publishers. This project is created purely for{" "}
          <span className="font-medium text-yellow-300">educational, research, and demonstration purposes</span>. No copyright
          infringement is intended, and this app does not claim ownership over any third-party content.
        </p>
        <p>
          Please visit the original publishers for complete information and official updates.
        </p>
      </CardContent>
    </div>
  );
}
