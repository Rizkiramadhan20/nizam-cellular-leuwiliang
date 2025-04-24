import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

import logo from '@/base/assets/logo/logo.webp'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-background rounded-md">
                <Image
                  src={logo}
                  alt="Nizam Cellular Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-md font-bold text-white">Nizam Cellular<br />Leuwiliang</h2>
            </div>
            <p className="text-gray-400 max-w-md">
              Konter HP terpercaya di Leuwiliang dengan pelayanan terbaik dan harga kompetitif.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-3 bg-[#2a2a2a] rounded-full hover:bg-blue-600 transition-all duration-300"
                aria-label="Facebook"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/nizamcellular"
                target='_blank'
                className="p-3 bg-[#2a2a2a] rounded-full hover:bg-pink-600 transition-all duration-300"
                aria-label="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/6285718184399"
                target='_blank'
                className="p-3 bg-[#2a2a2a] rounded-full hover:bg-green-600 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <span className="sr-only">WhatsApp</span>
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-6">Menu</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Produk
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Kontak</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <FaPhone className="text-blue-500" />
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>Jl. Raya Leuwiliang No. 123, Leuwiliang</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaEnvelope className="text-blue-500" />
                  <span>nizamcellular@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Berlangganan</h3>
            <p className="text-gray-400 mb-4">Dapatkan informasi terbaru tentang produk dan promo kami</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-transparent"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-300"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2023 <a href="https://spacedigitalia.my.id">Space Digitalia</a>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Kebijakan Privasi
              </Link>

              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}