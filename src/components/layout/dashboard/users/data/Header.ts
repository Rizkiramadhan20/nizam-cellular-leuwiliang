import { FiHome, FiSettings } from "react-icons/fi";

import { GrTransaction } from "react-icons/gr";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/users",
  },

  {
    icon: GrTransaction,
    label: "Transaksi",
    href: "/dashboard/users/transaction",
    subItems: [
      {
        label: "Daftar Transaksi",
        href: "/dashboard/users/transaction",
      },

      {
        label: "Pengembalian Transaksi",
        href: "/dashboard/users/transaction/return",
      },

      {
        label: "Transaksi Selesai",
        href: "/dashboard/users/transaction/completed",
      },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/users/settings",
    subItems: [
      { label: "Profile", href: "/dashboard/users/settings/profile" },
      { label: "Security", href: "/dashboard/users/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
