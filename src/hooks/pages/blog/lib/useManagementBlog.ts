import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { BlogType } from "@/hooks/pages/blog/types/Blog";

import { FetchBlog } from "@/hooks/pages/blog/lib/FetchBlog";

import { FormatSlug } from "@/base/helper/FormatSlug";

export function useManagementBlog() {
    const [blog, setBlog] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<BlogType[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 9;
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = FetchBlog((newBlog) => {
            const sortedBlog = newBlog.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setBlog(sortedBlog);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }

        const results = blog.filter(
            (blog) =>
                blog.title.toLowerCase().includes(query) ||
                blog.category.toLowerCase().includes(query)
        );

        setSearchResults(results.slice(0, 5));
    };

    const handleSearchResultClick = (blog: BlogType) => {
        const modal = document.getElementById("search_modal") as HTMLDialogElement;
        if (modal) modal.close();
        setSelectedCategory(blog.category);
        setSearchQuery("");
        setSearchResults([]);
        router.push(`/blogs/${FormatSlug(blog.category)}/${blog.slug}`);
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleModalOpen = () => {
        const modal = document.getElementById("search_modal") as HTMLDialogElement;
        document.body.style.overflow = "hidden";
        modal?.showModal();
    };

    const handleModalClose = () => {
        document.body.style.overflow = "unset";
    };

    // Computed values
    const filteredBlog =
        selectedCategory === "all"
            ? blog
            : blog.filter((blog) => blog.category === selectedCategory);

    const topBlog = blog[0];
    const otherBlog = filteredBlog.filter(blog => blog !== topBlog);
    const paginatedBlog = otherBlog.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );
    const totalPages = Math.ceil(otherBlog.length / ITEMS_PER_PAGE);

    return {
        // State
        blog,
        loading,
        selectedCategory,
        searchQuery,
        searchResults,
        currentPage,
        // Computed values
        topBlog,
        paginatedBlog,
        totalPages,
        // Handlers
        setSelectedCategory,
        handleSearch,
        handleSearchResultClick,
        handlePageChange,
        handleModalOpen,
        handleModalClose,
    };
}