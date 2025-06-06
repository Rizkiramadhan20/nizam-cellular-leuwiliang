import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/admin";

import { UpdateRequest } from "firebase-admin/auth";

export async function PUT(request: Request) {
  try {
    const { uid, displayName, email, password } = await request.json();

    // Update in Firebase Auth
    const updateData: UpdateRequest = {
      displayName,
      email,
      ...(password && { password }),
    };

    await auth.updateUser(uid, updateData);

    // Update in Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .update({
        displayName,
        email,
        updatedAt: new Date(),
      });

    return NextResponse.json({ message: "Karyawan updated successfully" });
  } catch (error) {
    console.error("Error updating Karyawan:", error);
    return NextResponse.json(
      { error: "Failed to update Karyawan" },
      { status: 500 }
    );
  }
}
