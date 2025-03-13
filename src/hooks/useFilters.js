import { useSearchParams } from "react-router-dom";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilters = {
    category: searchParams.get("category")?.split(",").filter(Boolean) || [],
    brand: searchParams.get("brand")?.split(",").filter(Boolean) || [],
    color: searchParams.get("color")?.split(",").filter(Boolean) || [],
  };
  const minPrice = parseFloat(searchParams.get("minPrice")) || 5.0;
  const maxPrice = parseFloat(searchParams.get("maxPrice")) || 1490.0;
  const priceRange = [minPrice, maxPrice];

  const filterAndSortProducts = (products, sortOption) => {
    const [minPrice, maxPrice] = priceRange;

    let filtered = products.filter((product) => {
      const price = Number(product.price) || Number(product.cost) || 0;
      const category = product.category || product.type;
      const brand = product.brand || product.manufacturer;
      const color = product.color || product.colour;

      return (
        price >= minPrice &&
        price <= maxPrice &&
        (activeFilters.category.length === 0 ||
          (category && activeFilters.category.includes(category))) &&
        (activeFilters.brand.length === 0 ||
          (brand && activeFilters.brand.includes(brand))) &&
        (activeFilters.color.length === 0 ||
          (color && activeFilters.color.includes(color)))
      );
    });

    if (sortOption === "price-asc") {
      filtered.sort((a, b) => {
        const priceA = Number(a.price) || Number(a.cost) || 0;
        const priceB = Number(b.price) || Number(b.cost) || 0;
        return priceA - priceB;
      });
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => {
        const priceA = Number(a.price) || Number(a.cost) || 0;
        const priceB = Number(b.price) || Number(b.cost) || 0;
        return priceB - priceA;
      });
    }

    return filtered;
  };

  const updatePriceRange = (newRange) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("minPrice", newRange[0].toString());
    newParams.set("maxPrice", newRange[1].toString());
    setSearchParams(newParams, { replace: true });
  };

  const updateFilters = (newFilters) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        newParams.set(key, values.join(","));
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  return {
    activeFilters,
    setActiveFilters: updateFilters,
    priceRange,
    setPriceRange: updatePriceRange,
    filterAndSortProducts,
  };
}
