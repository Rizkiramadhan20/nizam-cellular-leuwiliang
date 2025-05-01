import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/admin";

import { UpdateRequest } from "firebase-admin/auth";

export async function PUT(request: Request) {
  try {
    const { uid, displayName, email, password, phoneNumber } =
      await request.json();

    // Update in Firebase Auth
    const updateData: UpdateRequest = {
      displayName,
      email,
      ...(password && { password }),
      phoneNumber,
    };

    await auth.updateUser(uid, updateData);

    // Update in Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .update({
        displayName,
        email,
        phoneNumber,
        updatedAt: new Date(),
      });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating User:", error);
    return NextResponse.json(
      { error: "Failed to update User" },
      { status: 500 }
    );
  }
}
