import { type SchemaTypeDefinition } from 'sanity'
import productsType from './productsType'
import { blockContentType } from './blockContentType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productsType],
}
