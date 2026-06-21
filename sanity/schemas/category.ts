import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      description: "e.g. Market Analysis, Currency Guide, News & Updates",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated from the category name. Used in URLs.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional short description of this category.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
})
