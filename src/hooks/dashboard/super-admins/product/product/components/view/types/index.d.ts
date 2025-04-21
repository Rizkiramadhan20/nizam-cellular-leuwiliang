import { Project } from '../../../../types/Product';

export interface ViewHeroProps {
    project: Project;
    onClose: () => void;
}

export interface ViewStatsProps {
    project: Project;
}

export interface ViewContentProps {
    project: Project;
}

export interface ViewSidebarProps {
    project: Project;
}

export interface ViewImagesProps {
    project: Project;
} 