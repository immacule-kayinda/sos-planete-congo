import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Gift } from "lucide-react";

interface ProfileInventoryCardProps {
  inventory: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string | null;
    quantity: number;
    purchasedAt: string;
  }>;
}

export function ProfileInventoryCard({ inventory }: ProfileInventoryCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AVATAR":
        return "👤";
      case "BADGE":
        return "🏆";
      case "BOOK":
        return "📚";
      case "GAME_ITEM":
        return "🎮";
      case "DECORATION":
        return "🎨";
      case "SPECIAL":
        return "💎";
      default:
        return "📦";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AVATAR":
        return "bg-blue-100 text-blue-800";
      case "BADGE":
        return "bg-yellow-100 text-yellow-800";
      case "BOOK":
        return "bg-green-100 text-green-800";
      case "GAME_ITEM":
        return "bg-purple-100 text-purple-800";
      case "DECORATION":
        return "bg-pink-100 text-pink-800";
      case "SPECIAL":
        return "bg-gradient-to-r from-purple-400 to-pink-400 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (inventory.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Votre inventaire est vide</p>
            <p className="text-sm text-muted-foreground mt-2">
              Achetez des objets dans la boutique avec vos étoiles !
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Inventaire ({inventory.length} objets)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    {item.quantity > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        x{item.quantity}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Acheté le {formatDate(item.purchasedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
