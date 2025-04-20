import { database } from '@/utils/firebase/firebase';

import { ref, get, set, increment } from 'firebase/database';

export const incrementBlogViews = async (slug: string) => {
    const hasViewed = localStorage.getItem(`viewed_${slug}`);
    if (hasViewed) return;

    try {
        const viewsRef = ref(database, `${process.env.NEXT_PUBLIC_COLLECTIONS_BLOG_VIEWS}/${slug}`);
        const snapshot = await get(viewsRef);

        if (snapshot.exists()) {
            await set(viewsRef, increment(1));
        } else {
            await set(viewsRef, 1);
        }

        localStorage.setItem(`${process.env.NEXT_PUBLIC_COLLECTIONS_BLOG_VIEWS}${slug}`, 'true');
    } catch (error) {
        console.error('Error incrementing blog views:', error);
    }
};

export const getBlogViews = async (slug: string): Promise<number> => {
    try {
        const viewsRef = ref(database, `${process.env.NEXT_PUBLIC_COLLECTIONS_BLOG_VIEWS}/${slug}`);
        const snapshot = await get(viewsRef);

        if (snapshot.exists()) {
            return snapshot.val();
        }
        return 0;
    } catch (error) {
        console.error('Error getting blog views:', error);
        return 0;
    }
}; 