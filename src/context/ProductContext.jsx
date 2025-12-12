import { createContext, useState, useEffect } from "react";
import { productApi } from "../api/productApi";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        setProducts(res.data.products);
        setLoaded(true);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    if (!loaded) fetchProducts();
  }, [loaded]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}