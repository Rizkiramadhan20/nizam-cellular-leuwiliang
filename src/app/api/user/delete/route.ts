import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/admin";

export async function DELETE(request: Request) {
  try {
    const { uid } = await request.json();

    // Delete from Firebase Auth
    await auth.deleteUser(uid);

    // Delete from Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .delete();

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
