import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "hdpe", name: "HDPE" },
  { id: "bore-casing", name: "BORE CASING" },
  { id: "upvc", name: "UPVC" },
  { id: "cpvc", name: "CPVC" },
  { id: "pprc", name: "PPRC" },
  { id: "gi", name: "G.I" }
];

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto p-1 bg-muted">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="text-sm font-medium py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};