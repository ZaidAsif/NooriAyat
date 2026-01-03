import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="space-y-4 max-w-md">
        <p className="ayah-arabic">إِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
        <p className="ayah-translation">Indeed, with hardship comes ease.</p>
        <Button>Get another ayah</Button>
      </Card>
    </div>
  );
}
