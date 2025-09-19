import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ExternalLink, 
  Plus, 
  Code, 
  GitBranch, 
  Clock, 
  Monitor,
  RefreshCw
} from "lucide-react";

interface Codespace {
  id: string;
  name: string;
  display_name: string;
  state: "Available" | "Shutdown" | "Starting" | "Created";
  created_at: string;
  last_used_at: string;
  web_url: string;
  machine: {
    name: string;
    display_name: string;
  };
  git_status: {
    ref: string;
    ref_type: "branch" | "tag";
  };
}

export const CodespaceManager = () => {
  const [codespaces, setCodespaces] = useState<Codespace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Repository information - this would be dynamically determined in a real app
  const repoOwner = "taha7926";
  const repoName = "pipe-trader-showcase";
  const repoUrl = `https://github.com/${repoOwner}/${repoName}`;

  const createCodespace = () => {
    // Open GitHub to create a new codespace
    const createUrl = `${repoUrl}/codespaces/new`;
    window.open(createUrl, '_blank');
  };

  const openCodespace = (codespace: Codespace) => {
    window.open(codespace.web_url, '_blank');
  };

  const viewAllCodespaces = () => {
    // Open GitHub codespaces dashboard
    window.open('https://github.com/codespaces', '_blank');
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case "Available":
        return "bg-green-500";
      case "Starting":
        return "bg-yellow-500";
      case "Shutdown":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              GitHub Codespaces for {repoName}
            </CardTitle>
            <CardDescription className="mt-2">
              Manage your cloud development environments for this repository
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={viewAllCodespaces}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={createCodespace}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Codespace
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.open(repoUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            View Repository
          </Button>
        </div>

        <Separator />

        {/* Instructions */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-sm">How to find your existing Codespaces:</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-medium">1.</span>
              <span>Go to the <a href={repoUrl} target="_blank" className="text-primary hover:underline">repository page</a></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">2.</span>
              <span>Click the green "Code" button</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">3.</span>
              <span>Select the "Codespaces" tab</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">4.</span>
              <span>You'll see all your existing codespaces or can create a new one</span>
            </div>
          </div>
        </div>

        {/* Alternative: GitHub Codespaces Dashboard */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Monitor className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                View All Your Codespaces
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Visit the GitHub Codespaces dashboard to see all your codespaces across all repositories, 
                manage settings, and view usage.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={viewAllCodespaces}
                className="text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/30"
              >
                Open Codespaces Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Repository-specific info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="font-medium">Repository:</span>
            <div className="text-muted-foreground">{repoOwner}/{repoName}</div>
          </div>
          <div className="space-y-1">
            <span className="font-medium">Tech Stack:</span>
            <div className="flex gap-1 flex-wrap">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Vite</Badge>
              <Badge variant="secondary">Tailwind</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};