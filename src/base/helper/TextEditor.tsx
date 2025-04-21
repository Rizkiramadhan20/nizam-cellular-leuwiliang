import dynamic from 'next/dynamic';

import { useCallback, useRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
}

interface QuillEditor {
    getEditor: () => {
        getSelection: () => { index: number } | null;
        insertEmbed: (index: number, type: string, value: string) => void;
    };
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = "Write your content here...",
    className = "h-[300px] mb-12"
}) => {
    const quillRef = useRef<QuillEditor>(null);

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
                try {
                    // Convert file to base64
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64Image = e.target?.result as string;
                        const editor = quillRef.current?.getEditor();
                        if (editor) {
                            const range = editor.getSelection();
                            editor.insertEmbed(range?.index || 0, 'image', base64Image);
                        }
                    };
                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list',
        'link', 'image'
    ];

    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className={className}
                placeholder={placeholder}
                ref={quillRef}
            />
        </div>
    );
};

export default RichTextEditor;