import { CodespaceManager } from "@/components/CodespaceManager";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DeveloperTools = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Site
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Developer Tools</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Development Environment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your GitHub Codespaces and development environment for the pipe-trader-showcase repository.
            </p>
          </div>

          <CodespaceManager />
        </div>
      </main>
    </div>
  );
};

export default DeveloperTools;