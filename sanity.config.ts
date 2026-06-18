import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { schemaTypes } from "./sanity/schemas"

export default defineConfig({
  name: "currencies-global",
  title: "Currencies Global",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
