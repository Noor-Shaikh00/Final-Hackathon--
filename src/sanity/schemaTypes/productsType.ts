import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "srcUrl",
      type: "image",
      title: "Main Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Gallery Images",
      of: [
        defineField({
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "discount",
      type: "object",
      title: "Discount",
      fields: [
        defineField({
          name: "amount",
          type: "number",
          title: "Discount Amount",
          initialValue: 0,
        }),
        defineField({
          name: "percentage",
          type: "number",
          title: "Discount Percentage",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Indicates whether the product is currently in stock",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      description: "Number of items available in stock",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.min(0).max(5),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
      inStock: "inStock",
      stock: "stock",
    },
    prepare({ title, subtitle, media, inStock, stock }) {
      return {
        title,
        subtitle: `$${subtitle} | ${inStock ? `In Stock (${stock})` : "Out of Stock"}`,
        media,
      };
    },
  },
});
