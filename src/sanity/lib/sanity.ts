import { client } from './client'; // Ensure the correct import path
import { Product } from '../../../types'; // Ensure the correct import path

export async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    srcUrl,
    gallery,
    price,
    discount,
    rating,
    inStock,
    stock
  }`;

  const products = await client.fetch<Product[]>(query);
  return products;
}