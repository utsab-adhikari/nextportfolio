import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WarnCard() {
  return (
    <motion.div
      className="w-full bg-slate-900/50 backdrop-blur-lg rounded-xl shadow-lg border border-indigo-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <Card className="bg-transparent border-0">
        <CardHeader>
          <CardTitle className="text-xl gradient-text text-red-600">Credits & Disclaimer</CardTitle>
          <CardDescription className="text-gray-400">
            For Educational & Informational Purposes Only
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">
            This platform fetches data from publicly available sources like{" "}
            <a
              href="https://hamropatro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline inline-flex items-center text-indigo-400 hover:text-indigo-300 transition"
            >
              Hamropatro <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </p>
          <p className="text-sm text-gray-300">
            All data, content, and media belong to their respective publishers. This project is created for{" "}
            <span className="font-medium text-indigo-400">educational, research, and demonstration purposes</span>. No copyright infringement is intended.
          </p>
          <p className="text-sm text-gray-300">
            Please refer to the official websites for full articles and original content. This platform does not store or claim ownership of any third-party data.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}