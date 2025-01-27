import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/common/ProductCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { getProducts } from "@/sanity/lib/sanity";

const ShopPage = async () => {
  // Fetch all products from Sanity
  const products = await getProducts();

  // For simplicity, split the products into new arrivals, top selling, and related products
  const newArrivalsData = products.slice(0, 4);
  const topSellingData = products.slice(4, 8);
  const relatedProductData = products.slice(8, 12);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex flex-col w-full space-y-5">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
              {/* You can remove MobileFilters component entirely */}
            </div>
            <div className="flex flex-col sm:items-center sm:flex-row">
              <span className="text-sm md:text-base text-black/60 mr-3">
                Showing 1-10 of {products.length} Products
              </span>
              <div className="flex items-center">
                Sort by:{" "}
                <Select defaultValue="most-popular">
                  <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-popular">Most Popular</SelectItem>
                    <SelectItem value="low-price">Low Price</SelectItem>
                    <SelectItem value="high-price">High Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {[...relatedProductData.slice(1, 4), ...newArrivalsData.slice(1, 4), ...topSellingData.slice(1, 4)].map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
          </div>
          <hr className="border-t-black/10" />
          <Pagination className="justify-between">
            <PaginationPrevious href="#" className="border border-black/10" />
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" className="text-black/50 font-medium text-sm" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="text-black/50 font-medium text-sm" />
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden sm:block">
                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                  9
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                  10
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>

            <PaginationNext href="#" className="border border-black/10" />
          </Pagination>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;