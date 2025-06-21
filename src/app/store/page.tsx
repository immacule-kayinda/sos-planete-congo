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
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function StorePage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">Boutique de Livres</h1>
              <p className="text-muted-foreground">
                Découvrez notre collection de livres éducatifs sur
                l'environnement et la culture de la RDC
              </p>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Rechercher un livre..."
                className="max-w-sm"
              />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les langues</SelectItem>
                  <SelectItem value="francais">Français</SelectItem>
                  <SelectItem value="lingala">Lingala</SelectItem>
                  <SelectItem value="kikongo">Kikongo</SelectItem>
                  <SelectItem value="swahili">Swahili</SelectItem>
                  <SelectItem value="tshiluba">Tshiluba</SelectItem>
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
          </ScrollReveal>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Book Card */}
            <ScrollReveal>
              <div className="group relative bg-card rounded-lg overflow-hidden border transition-all hover:shadow-lg">
                <div className="aspect-[3/4] bg-muted relative">
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">SOS Planète Congo</h3>
                  <p className="text-sm text-muted-foreground">
                    Livre d'activités éducatives et ludiques
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Français
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Lingala
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-primary">24.99€</span>
                    <Button size="sm">Ajouter</Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Repeat Book Card for demo */}
            {[...Array(3)].map((_, i) => (
              <ScrollReveal key={i} delay={0.1 * (i + 1)}>
                <div className="group relative bg-card rounded-lg overflow-hidden border transition-all hover:shadow-lg">
                  <div className="aspect-[3/4] bg-muted relative">
                    <div className="absolute inset-0 bg-primary/10" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">
                      SOS Planète Congo - Édition {i + 2}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Version en langue nationale
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {["Kikongo", "Swahili", "Tshiluba"][i]}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-primary">19.99€</span>
                      <Button size="sm">Ajouter</Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
