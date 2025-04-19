import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill, RiPagesFill } from "react-icons/ri";

import { GrArticle, GrTransaction } from "react-icons/gr";

import { TbReportAnalytics } from "react-icons/tb";

import { FiLayout } from "react-icons/fi";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/super-admins",
  },

  {
    icon: FiLayout,
    label: "Layout",
    href: "/dashboard/super-admins/layout",
    subItems: [
      { label: "Home", href: "/dashboard/super-admins/layout/home" },
      { label: "Services", href: "/dashboard/super-admins/layout/services" },
      { label: "Faqs", href: "/dashboard/super-admins/layout/faqs" },
      {
        label: "Konsultasi",
        href: "/dashboard/super-admins/layout/konsultasi",
      },
      {
        label: "Gallery",
        href: "/dashboard/super-admins/layout/gallery",
      },
    ],
  },

  {
    icon: RiPagesFill,
    label: "Pages",
    href: "/dashboard/super-admins/pages",
    subItems: [
      { label: "About", href: "/dashboard/super-admins/pages/about" },
      { label: "Contact", href: "/dashboard/super-admins/pages/contact" },
      {
        label: "Testimonials",
        href: "/dashboard/super-admins/pages/testimonials",
      },
    ],
  },

  {
    icon: GrArticle,
    label: "Blog",
    href: "/dashboard/super-admins/blog",
    subItems: [
      {
        label: "Daftar Blog",
        href: "/dashboard/super-admins/blog",
      },

      {
        label: "Kategori",
        href: "/dashboard/super-admins/blog/category",
      },
    ],
  },

  {
    icon: GrTransaction,
    label: "Transactions",
    href: "/dashboard/super-admins/price",
    subItems: [
      { label: "Price List", href: "/dashboard/super-admins/price" },
      { label: "Card", href: "/dashboard/super-admins/price/card" },
    ],
  },

  {
    icon: TbReportAnalytics,
    label: "Rekap",
    href: "/dashboard/super-admins/rekap",
  },

  {
    icon: RiAdminFill,
    label: "Accounts",
    href: "/dashboard/super-admins/accounts",
    subItems: [
      { label: "Admins", href: "/dashboard/super-admins/accounts/admins" },
      { label: "User", href: "/dashboard/super-admins/accounts/user" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/super-admins/profile",
    subItems: [
      { label: "Profile", href: "/dashboard/super-admins/profile" },
      { label: "Security", href: "/dashboard/super-admins/profile/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
