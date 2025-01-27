import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('product').title('Product'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["product"].includes(item.getId()!),
      ),
    ])
