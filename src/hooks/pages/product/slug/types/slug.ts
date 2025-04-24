export interface ProductImagesProps {
    images: string[]
    title: string
}

export interface ProductInfoProps {
    title: string
    genreTitle: string
    typeTitle: string
    price: number
    stock: number
    sold: number
    description: string
    authorPhone: string
}

export interface ProductAuthorProps {
    author: {
        name: string
        role: string
        photoURL: string
    }
}

export interface ProductDescriptionProps {
    content: string
}

export interface ProductCategoryProps {
    typeCategory: string
    icon: string
    title: string
}