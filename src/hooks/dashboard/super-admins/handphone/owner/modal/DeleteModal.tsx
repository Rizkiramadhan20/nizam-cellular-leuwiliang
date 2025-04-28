import React from 'react';

import { DeleteModalProps } from '@/hooks/dashboard/super-admins/handphone/brand/types/BrandHandphone';

export const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onClose, isDeleting }) => {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Penghapusan</h3>
          <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus konten ini? Tindakan ini tidak dapat dibatalkan.</p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={onClose}
              disabled={isDeleting}
            >
              Batal
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Hapus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};