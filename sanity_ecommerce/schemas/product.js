export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "package",
      title: "Package",
      type: "boolean",
    },
    {
      name: "designerSpecialty",
      title: "Designer or Specialty Product",
      type: "boolean",
    },
    {
      name: "alaCarte",
      title: "Ala Carte Product",
      type: "boolean",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
  ],
};
