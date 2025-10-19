"use client";
import {
  type FormField,
  type ProductFormData,
} from "@/app/users/dashboard/add-products/page";
import { Info } from "lucide-react";
import React, { SetStateAction, useState } from "react";

export type category = {
  name: string;
  value: string;
  description: string;
  examples: string;
};

type CategorySelectProps = {
  category: category;
  handleChange: <K extends FormField>(
    field: K,
    value: ProductFormData[K]
  ) => void;
  value: string;
  setCategoryOpen : React.Dispatch<SetStateAction<boolean>>
};

const CategorySelect = ({
  category,
  handleChange,
  value,
  setCategoryOpen,
}: CategorySelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="relative w-full max-w-sm">
      <div className="group relative overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:border-[#B6349A] hover:shadow-lg hover:shadow-[#B6349A]/10">
        <div className="flex items-center justify-between p-4">
          <span
            onClick={() => {handleChange("category", value); setCategoryOpen(false)}}
            className="flex-1 cursor-pointer text-base font-semibold text-gray-800 transition-colors duration-200 group-hover:text-[#B6349A]"
          >
            {category.name}
          </span>

          <button
            onClick={() => setOpen(true)}
            className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#B6349A]/10 text-[#B6349A] transition-all duration-200 hover:bg-[#B6349A] hover:text-white hover:scale-110"
            aria-label="Show category information"
          >
            <Info size={18} />
          </button>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#B6349A] via-[#D87BC0] to-[#B6349A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Popover */}
          <div className="absolute right-0 top-full mt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="rounded-2xl border-2 border-[#B6349A]/20 bg-white shadow-2xl shadow-[#B6349A]/20 dark:bg-gray-900 dark:border-[#B6349A]/30">
              {/* Header with gradient */}
              <div className="border-b border-gray-100 bg-gradient-to-r from-[#B6349A]/5 to-[#D87BC0]/5 p-4 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-2">
                    {category.name}
                  </h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#B6349A] dark:hover:bg-gray-800"
                    aria-label="Close"
                  >
                    <span className="text-lg leading-none">✕</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="rounded-lg bg-[#B6349A]/5 p-3 border border-[#B6349A]/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#B6349A] mb-1">
                    Description
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-[#D87BC0]/5 to-[#B6349A]/5 p-3 border border-[#B6349A]/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#B6349A] mb-1">
                    Examples
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {category.examples}
                  </p>
                </div>
              </div>

              {/* Decorative bottom accent */}
              <div className="h-1 w-full rounded-b-2xl bg-gradient-to-r from-[#B6349A] via-[#D87BC0] to-[#B6349A]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelect;
