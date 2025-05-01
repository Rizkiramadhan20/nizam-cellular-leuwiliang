import { useState, useEffect } from "react";

import { UserAccount } from "@/utils/context/interface/Auth";

import { userService } from "@/hooks/dashboard/super-admins/accounts/users/utils/UsersServer";

import { UserFormData } from "@/hooks/dashboard/super-admins/accounts/users/types/Users";

import toast from "react-hot-toast";

export function useUserManagement() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const allUsers = await userService.fetchUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal mengambil data user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleModalSubmit = async (
    modalMode: "create" | "edit",
    formData: UserFormData
  ) => {
    try {
      setIsSubmitting(true);
      if (modalMode === "create") {
        await userService.createUser({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          role: formData.role,
          phoneNumber: formData.phoneNumber,
        });
      } else {
        await userService.updateUser({
          uid: formData.uid,
          email: formData.email,
          displayName: formData.displayName,
          phoneNumber: formData.phoneNumber,
          ...(formData.password && { password: formData.password }),
        });
      }

      toast.success(
        `Users berhasil ${
          modalMode === "create" ? "ditambahkan" : "diperbarui"
        }`
      );
      await fetchUsers();
      return true;
    } catch {
      toast.error(
        `Gagal ${modalMode === "create" ? "menambahkan" : "memperbarui"} Users`
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    try {
      setDeletingId(uid);
      await userService.deleteUser(uid);
      toast.success("Users berhasil dihapus");
      await fetchUsers();
      return true;
    } catch {
      toast.error("Gagal menghapus Users");
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    users,
    isLoading,
    isSubmitting,
    deletingId,
    handleModalSubmit,
    handleDeleteUser,
    fetchUsers,
  };
}
