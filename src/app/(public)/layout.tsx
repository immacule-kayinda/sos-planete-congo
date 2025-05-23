import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) redirect("/learn");
  return <div>{children}</div>;
}
