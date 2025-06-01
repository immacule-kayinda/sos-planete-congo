import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";

export default function StorePage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1>Boutique</h1>
            <p className="text-muted-foreground">
              Découvrez notre sélection de produits pour soutenir la cause
              environnementale
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Rechercher un produit..."
              className="max-w-sm"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="vêtements">Vêtements</SelectItem>
                <SelectItem value="accessoires">Accessoires</SelectItem>
                <SelectItem value="goodies">Goodies</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="0-20">0€ - 20€</SelectItem>
                <SelectItem value="20-50">20€ - 50€</SelectItem>
                <SelectItem value="50+">50€ et plus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Product Card */}
            <div className="group relative bg-card rounded-lg overflow-hidden border transition-all hover:shadow-lg">
              <div className="aspect-square bg-muted relative">
                <div className="absolute inset-0 bg-primary/10" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">T-shirt SOS Planète</h3>
                <p className="text-sm text-muted-foreground">
                  T-shirt en coton bio
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-primary">24.99€</span>
                  <Button size="sm">Ajouter</Button>
                </div>
              </div>
            </div>

            {/* Repeat Product Card for demo */}
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="group relative bg-card rounded-lg overflow-hidden border transition-all hover:shadow-lg"
              >
                <div className="aspect-square bg-muted relative">
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Produit {i + 2}</h3>
                  <p className="text-sm text-muted-foreground">
                    Description du produit
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-primary">19.99€</span>
                    <Button size="sm">Ajouter</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
