"use client";

import { useState, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  BookOpen,
  Award,
  Gamepad2,
  Palette,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ErrorDisplay from "@/components/ui/error-display";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

interface InventoryItem {
  id: string;
  quantity: number;
  item: ShopItem;
  purchasedAt: string;
}

interface ShopData {
  items: ShopItem[];
  inventory: InventoryItem[];
  totalStars: number;
}

const categoryIcons = {
  AVATAR: <Palette className="w-4 h-4" />,
  BADGE: <Award className="w-4 h-4" />,
  BOOK: <BookOpen className="w-4 h-4" />,
  GAME_ITEM: <Gamepad2 className="w-4 h-4" />,
  DECORATION: <Sparkles className="w-4 h-4" />,
  SPECIAL: <Star className="w-4 h-4" />,
};

const categoryLabels = {
  AVATAR: "Avatars",
  BADGE: "Badges",
  BOOK: "Livres",
  GAME_ITEM: "Objets de jeu",
  DECORATION: "Décorations",
  SPECIAL: "Objets spéciaux",
};

export default function ShopPage() {
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadShopData();
  }, []);

  const loadShopData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, inventoryResponse] = await Promise.all([
        fetch("/api/shop/items"),
        fetch("/api/shop/inventory"),
      ]);

      if (itemsResponse.ok && inventoryResponse.ok) {
        const items = await itemsResponse.json();
        const { inventory, totalStars } = await inventoryResponse.json();
        setShopData({ items, inventory, totalStars });
      } else {
        throw new Error("Failed to load shop data");
      }
    } catch (error) {
      console.error("Error loading shop data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de la boutique.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const purchaseItem = async (
    itemId: string,
    itemName: string,
    price: number
  ) => {
    if (purchasing) return;

    try {
      setPurchasing(itemId);
      const response = await fetch("/api/shop/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        const result = await response.json();
        setShopData((prev) =>
          prev
            ? {
                ...prev,
                totalStars: result.remainingStars,
                inventory: [...prev.inventory, result.inventory],
              }
            : null
        );

        toast({
          title: "Achat réussi !",
          description: `Vous avez acheté "${itemName}" pour ${price} étoiles.`,
          variant: "default",
        });
      } else {
        const error = await response.text();
        toast({
          title: "Erreur d'achat",
          description:
            error === "Insufficient stars"
              ? "Vous n'avez pas assez d'étoiles pour cet achat."
              : "Impossible d'effectuer l'achat. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error purchasing item:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  const getItemQuantity = (itemId: string) => {
    const inventoryItem = shopData?.inventory.find(
      (inv) => inv.item.id === itemId
    );
    return inventoryItem?.quantity || 0;
  };

  const groupItemsByCategory = (items: ShopItem[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, ShopItem[]>);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!shopData) {
    return (
      <ErrorDisplay
        title="Erreur de chargement"
        message="Impossible de charger les données de la boutique."
      />
    );
  }

  const groupedItems = groupItemsByCategory(shopData.items);

  return (
    <div className="flex flex-col gap-6">
      {/* Header avec solde */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-purple-50">Boutique</h1>
            <p className="text-purple-100">
              Dépensez vos étoiles pour acheter des objets exclusifs !
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-2xl font-bold">{shopData.totalStars}</span>
            </div>
            <p className="text-sm text-purple-100">Étoiles disponibles</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="shop" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shop" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Boutique
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Mon Inventaire
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2">
                {categoryIcons[category as keyof typeof categoryIcons]}
                <h2 className="text-xl font-bold">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                  const ownedQuantity = getItemQuantity(item.id);
                  const canAfford = shopData.totalStars >= item.price;

                  return (
                    <Card
                      key={item.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {item.name}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {item.description}
                            </CardDescription>
                          </div>
                          {ownedQuantity > 0 && (
                            <Badge variant="secondary" className="ml-2">
                              Possédé: {ownedQuantity}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold">{item.price}</span>
                          </div>

                          <Button
                            onClick={() =>
                              purchaseItem(item.id, item.name, item.price)
                            }
                            disabled={!canAfford || purchasing === item.id}
                            variant={canAfford ? "default" : "secondary"}
                            size="sm"
                          >
                            {purchasing === item.id
                              ? "Achat..."
                              : canAfford
                              ? "Acheter"
                              : "Pas assez d'étoiles"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          {shopData.inventory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Votre inventaire est vide</p>
              <p className="text-sm">
                Achetez des objets dans la boutique pour les voir ici !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopData.inventory.map((inventoryItem) => (
                <Card
                  key={inventoryItem.id}
                  className="bg-green-50 border-green-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {inventoryItem.item.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {inventoryItem.item.description}
                        </CardDescription>
                      </div>
                      <Badge variant="default" className="ml-2 bg-green-600">
                        x{inventoryItem.quantity}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Acheté le{" "}
                        {new Date(inventoryItem.purchasedAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{inventoryItem.item.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
