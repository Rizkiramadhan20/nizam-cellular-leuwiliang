import { FiHome, FiSettings, FiPackage } from "react-icons/fi";

import { RiAdminFill, RiPagesFill } from "react-icons/ri";

import { GrArticle, GrTransaction } from "react-icons/gr";

import { TbReportAnalytics } from "react-icons/tb";

import { FiLayout } from "react-icons/fi";

import { CiCreditCard1 } from "react-icons/ci";

import { SlScreenSmartphone } from "react-icons/sl";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/super-admins",
  },

  {
    icon: FiPackage,
    label: "Product",
    href: "/dashboard/super-admins/product",
    subItems: [
      { label: "Daftar Product", href: "/dashboard/super-admins/product" },
      { label: "Category", href: "/dashboard/super-admins/product/category" },
      { label: "Genre", href: "/dashboard/super-admins/product/genre" },
      { label: "Type", href: "/dashboard/super-admins/product/type" },
      { label: "Icons", href: "/dashboard/super-admins/product/icons" },
      { label: "Logo", href: "/dashboard/super-admins/product/logo" },
    ],
  },

  {
    icon: SlScreenSmartphone,
    label: "Handphone",
    href: "/dashboard/super-admins/handphone",
    subItems: [
      {
        label: "Handphone",
        href: "/dashboard/super-admins/handphone",
      },
      {
        label: "Merek Handphone",
        href: "/dashboard/super-admins/handphone/brand",
      },
    ],
  },

  {
    icon: CiCreditCard1,
    label: "Voucher",
    href: "/dashboard/super-admins/voucher",
    subItems: [
      {
        label: "Voucher",
        href: "/dashboard/super-admins/voucher",
      },
      { label: "Merek Voucher", href: "/dashboard/super-admins/voucher/brand" },
    ],
  },

  {
    icon: GrTransaction,
    label: "Transaksi",
    href: "/dashboard/super-admins/transaction",
    subItems: [
      {
        label: "Daftar Transaksi",
        href: "/dashboard/super-admins/transaction",
      },
      {
        label: "Pengembalian Transaksi",
        href: "/dashboard/super-admins/transaction/return",
      },
      {
        label: "Transaksi Selesai",
        href: "/dashboard/super-admins/transaction/completed",
      },
    ],
  },

  {
    icon: TbReportAnalytics,
    label: "Rekap",
    href: "/dashboard/super-admins/rekap",
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
      {
        label: "Banner",
        href: "/dashboard/super-admins/pages/banner",
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
    href: "/dashboard/super-admins/settings",
    subItems: [
      { label: "Profile", href: "/dashboard/super-admins/settings/profile" },
      { label: "Security", href: "/dashboard/super-admins/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
