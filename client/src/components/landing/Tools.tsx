import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tool } from "@/types/tool";
import { Wand2, Target, FileText, Stars, Flame } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolsProps {
  tools: Tool[];
}

const IconMap = {
  Wand2: Wand2,
  Target: Target,
  FileText: FileText,
  Stars: Stars,
  Flame: Flame,
};

export default function Tools({ tools }: ToolsProps) {
  return (
    <section className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Powerful Tools for Your Success
        </h2>
        <p className="mt-4 text-gray-500 md:text-lg">
          Everything you need to create the perfect application
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = IconMap[tool.icon];
          return (
            <Link key={tool.title} to={tool.path}>
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader>
                  <Icon className="h-8 w-8 text-primary" />
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
