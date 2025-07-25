import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    if (session.user.role === "STUDENT") {
      redirect("/learn");
    } else {
      redirect("/teacher");
    }
  }
  return <div className="">{children}</div>;
}
