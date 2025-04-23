import React, { useEffect, useRef } from 'react';

import { ViewModalProps } from '@/hooks/dashboard/super-admins/product/product/types/Product';

import ViewHero from '@/hooks/dashboard/super-admins/product/product/components/view/ViewHero';

import ViewStats from '@/hooks/dashboard/super-admins/product/product/components/view/ViewStats';

import ViewContent from '@/hooks/dashboard/super-admins/product/product/components/view/ViewContent';

import ViewSidebar from '@/hooks/dashboard/super-admins/product/product/components/view/ViewSidebar';

const ViewModal: React.FC<ViewModalProps> = ({ viewProject, onClose }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (viewProject && dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, [viewProject]);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        onClose();
    };

    if (!viewProject) return null;

    return (
        <dialog
            ref={dialogRef}
            className="modal backdrop-blur-sm bg-black/30"
            onClose={handleClose}
        >
            <div className="modal-box max-w-6xl bg-background p-0 rounded-2xl overflow-hidden max-h-[95vh] flex flex-col shadow-2xl border border-[var(--border-color)]">
                <ViewHero project={viewProject} onClose={handleClose} />

                <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <ViewStats project={viewProject} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                            <ViewContent project={viewProject} />
                        </div>

                        <ViewSidebar project={viewProject} />
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button
                    onClick={handleClose}
                    className="absolute inset-0 w-full h-full cursor-default"
                    aria-label="Close modal"
                >
                </button>
            </form>
        </dialog>
    );
};

export default ViewModal; 