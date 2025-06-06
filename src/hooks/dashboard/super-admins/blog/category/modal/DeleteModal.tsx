import React from 'react';

import { DeleteModalProps } from '@/hooks/dashboard/super-admins/layout/services/types/Services';

export const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onClose }) => {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this content? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};