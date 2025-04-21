import { Timestamp } from 'firebase/firestore';

export interface Project {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    images: string[];
    slug: string;
    typeCategory: string;
    typeTitle: string;
    genreTitle: string;
    status: 'draft' | 'publish';
    content: string;
    stock: number;
    price: number;
    author: {
        name: string;
        role: string;
        uid: string;
        photoURL: string;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
    [key: `${string}.${string}`]: string | number | boolean | null | undefined;
}

export interface ProjectType {
    id: string;
    title: string;
    categoryTitle: string;
    genreTitle: string;
    createdAt: Timestamp;
}

export interface FormInputs {
    title: string;
    description: string;
    slug: string;
    typeCategory: string;
    typeTitle: string;
    genreTitle: string;
    status: 'draft' | 'publish';
    content: string;
    stock: number;
    price: number;
    authorId: string;
}