import { UserFormData } from "@/hooks/dashboard/super-admins/accounts/karyawan/types/Karyawan";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { UserAccount, Role } from "@/utils/context/interface/Auth";

export const adminService = {
  fetchUsers: async () => {
    const q = query(
      collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map((doc) => doc.data() as UserAccount)
      .filter((user) => user.role === Role.KARYAWAN);
  },

  createUser: async (userData: Omit<UserFormData, "uid">) => {
    const response = await fetch("/api/karyawan/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  },

  updateUser: async (
    userData: Pick<UserFormData, "uid" | "email" | "displayName"> & {
      password?: string;
    }
  ) => {
    const response = await fetch("/api/karyawan/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  },

  deleteUser: async (uid: string) => {
    const response = await fetch("/api/karyawan/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return response.json();
  },
};
