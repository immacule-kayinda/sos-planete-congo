import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const path = join(process.cwd(), "public/uploads", fileName);

    // Écrire le fichier
    await writeFile(path, buffer);

    // Retourner l'URL du fichier
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
