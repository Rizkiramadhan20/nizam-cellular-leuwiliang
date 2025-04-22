import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import { toast } from 'react-hot-toast'

import { DelateModalRef, DelateModalProps } from '@/hooks/dashboard/super-admins/product/product/types/Product'

const DelateModal = forwardRef<DelateModalRef, DelateModalProps>(({
    projectToDelete,
    setProjectToDelete,
    isDeleting,
    setIsDeleting,
    onSuccess
}, ref) => {
    const deleteModalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        showModal: () => {
            deleteModalRef.current?.showModal();
        },
        closeModal: () => {
            deleteModalRef.current?.close();
        }
    }));

    const confirmDelete = async () => {
        if (!projectToDelete) return

        setIsDeleting(true)
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string, projectToDelete))
            toast.success('Project deleted successfully!')
            onSuccess()
            deleteModalRef.current?.close()
            setProjectToDelete(null)
        } catch (error) {
            console.error('Error deleting project:', error)
            toast.error('Failed to delete project')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <dialog ref={deleteModalRef} className="modal">
            <div className="modal-box max-w-md bg-white p-0 rounded-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="p-6 pb-4 border-b border-[var(--border-color)]">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Delete Project</h3>
                            <p className="text-sm text-gray-500">This action cannot be undone.</p>
                        </div>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <p className="text-gray-600">
                        Are you sure you want to delete this project? All of its data will be permanently removed from our servers forever. This action cannot be undone.
                    </p>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-background">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-background border border-[var(--border-color)] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200"
                        onClick={() => {
                            deleteModalRef.current?.close()
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        onClick={confirmDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span>Deleting...</span>
                            </div>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Project
                            </>
                        )}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
})

DelateModal.displayName = 'DelateModal';

export default DelateModal
