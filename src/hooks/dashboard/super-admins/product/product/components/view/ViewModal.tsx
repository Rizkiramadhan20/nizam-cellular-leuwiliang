import React, { useEffect, useRef } from 'react';
import { Project } from '../../types/Product';
import ViewHero from './ViewHero';
import ViewStats from './ViewStats';
import ViewContent from './ViewContent';
import ViewSidebar from './ViewSidebar';

interface ViewModalProps {
    viewProject: Project | null;
    onClose: () => void;
}

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
        <dialog ref={dialogRef} className="modal" onClose={handleClose}>
            <div className="modal-box max-w-5xl bg-background p-0 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <ViewHero project={viewProject} onClose={handleClose} />

                <div className="p-8 space-y-10 overflow-y-auto flex-grow">
                    <ViewStats project={viewProject} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ViewContent project={viewProject} />
                        </div>

                        <ViewSidebar project={viewProject} />
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
};

export default ViewModal; 