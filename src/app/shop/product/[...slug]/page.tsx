import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { notFound } from "next/navigation";
import { getProducts } from "@/sanity/lib/sanity";

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Fetch all products from Sanity
  const products = await getProducts();

  // Find the product using the slug
  const productData = products.find(
    (product) => product.slug.current === params.slug[0]
  );

  // If the product is not found, return a 404 page
  if (!productData) {
    notFound();
  }

  // Fetch related products (for simplicity, use the first 4 products)
  const relatedProductData = products.slice(0, 4);

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.name ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec
          title="You might also like"
          data={relatedProductData}
        />
      </div>
    </main>
  );
}