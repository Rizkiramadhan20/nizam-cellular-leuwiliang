import React, { useState } from 'react';

import { Props } from '@/hooks/dashboard/super-admins/pages/testimonials/types/Testimonials';

import TestimonialForm from '@/hooks/dashboard/super-admins/pages/testimonials/modal/TestimonialsForm';

import Image from 'next/image';

export default function TestimonialCard({ testimonial, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(testimonial.id);
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-background rounded-2xl border border-[var(--border-color)] p-6 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-30" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <Image
            src={testimonial.imageUrl}
            alt={testimonial.name}
            width={64}
            height={64}
            className="rounded-full object-cover ring-2 ring-indigo-50 w-16 h-16 sm:w-[64px] sm:h-[64px]"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
            <div className="mt-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {isEditing && (
        <TestimonialForm
          testimonial={testimonial}
          onSubmit={async (data, imageFile) => {
            await onUpdate(testimonial.id, data, imageFile);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}