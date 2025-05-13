import Header from "@/components/header";
import CourseList from "./ui/courseList";

const comptes = [
  {
    titre: "Panique dans la foret",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/img/foret.png",
  },
  {
    titre: "Panique dans la foret",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/img/foret.png",
  },
  {
    titre: "Panique dans la foret",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/img/foret.png",
  },
  {
    titre: "Panique dans la foret",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/img/foret.png",
  },
];

export default function Courses() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Header />
      <div className="w-full bg-[url('/aboutbanner.png')] bg-cover relative h-[500px] ">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg font-nunito">
            A propos de nous
          </h1>
          <p className="text-lg text-white/90 font-medium mb-2">
            Bienvenu sur SOS-PLANETE CONGO
          </p>
        </div>
        <div className="absolute left-0 right-0 bottom-0 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,96C160,128,320,192,480,229.3C640,267,800,277,960,261.3C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex-1 w-full max-w-6xl mx-auto px-20 py-10">
        <CourseList comptes={comptes} />
      </div>
      <footer className="w-full bg-red-600 py-4 mt-10">
        <div className="text-center text-white font-bold">
          © SOS PLANETE CONGO, Tout les droits reservés 2025
        </div>
      </footer>
    </div>
  );
}
