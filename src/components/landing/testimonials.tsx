import { ScrollReveal } from "../ui/scroll-reveal";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ce qu'ils en disent</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos utilisateurs et
              partenaires
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-amber-50 rounded-2xl p-8 relative">
                  <Quote className="w-8 h-8 text-amber-400 mb-4" />
                  <p className="text-neutral-700 mb-6">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const testimonials = [
  {
    content:
      "Une initiative remarquable qui transforme l'éducation environnementale en RDC. Les élèves sont très engagés !",
    name: "Marie Kabasele",
    role: "Directrice d'école",
    // avatar: "/images/testimonials/teacher1.jpg",
    avatar: "https://placehold.co/600x400",
  },
  {
    content:
      "Les ressources pédagogiques sont excellentes et adaptées à notre contexte local. Un vrai plus pour nos cours.",
    name: "Patrick Mwamba",
    role: "Enseignant",
    // avatar: "/images/testimonials/teacher2.jpg",
    avatar: "https://placehold.co/600x400",
  },
  {
    content:
      "Un projet qui unit parfaitement l'éducation et la protection de l'environnement. Bravo pour cette belle initiative !",
    name: "Sarah Nzuzi",
    role: "Parent d'élève",
    // avatar: "/images/testimonials/parent.jpg",
    avatar: "https://placehold.co/600x400",
  },
];
