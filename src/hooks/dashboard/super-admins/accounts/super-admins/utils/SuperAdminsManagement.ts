import { useState, useEffect } from "react";

import { UserAccount } from "@/utils/context/interface/Auth";

import { adminService } from "@/hooks/dashboard/super-admins/accounts/super-admins/utils/SuperAdminsServer";

import { UserFormData } from "@/hooks/dashboard/super-admins/accounts/super-admins/types/SuperAdmins";

import toast from "react-hot-toast";

export function useSuperAdminsManagement() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const allUsers = await adminService.fetchUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal mengambil data super admins");
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
        await adminService.createUser({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          role: formData.role,
        });
      } else {
        await adminService.updateUser({
          uid: formData.uid,
          email: formData.email,
          displayName: formData.displayName,
          ...(formData.password && { password: formData.password }),
        });
      }

      toast.success(
        `Super Admin berhasil ${
          modalMode === "create" ? "ditambahkan" : "diperbarui"
        }`
      );
      await fetchUsers();
      return true;
    } catch {
      toast.error(
        `Gagal ${
          modalMode === "create" ? "menambahkan" : "memperbarui"
        } super admin`
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    try {
      setDeletingId(uid);
      await adminService.deleteUser(uid);
      toast.success("Super Admin berhasil dihapus");
      await fetchUsers();
      return true;
    } catch {
      toast.error("Gagal menghapus super admin");
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
