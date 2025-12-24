import { createContext, useState } from "react";
import { orderApi } from "../api/orderApi";

const ORDERS_PER_PAGE = 2;
// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [cachedPages, setCachedPages] = useState({});
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders for a specific page
  const fetchOrders = async (pageNumber = 1) => {
    // Use cached page if available
    if (cachedPages[pageNumber]) {
      setOrders(cachedPages[pageNumber]);
      return;
    }

    try {
      setLoading(true);
      const res = await orderApi.get(pageNumber, ORDERS_PER_PAGE);
      const data = res.data.orders || [];
      const total = res.data.totalPages || 1;

      setOrders(data);
      setTotalPages(total);

      // Cache this page
      setCachedPages((prev) => ({ ...prev, [pageNumber]: data }));
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("לא ניתן לטעון הזמנות");
    } finally {
      setLoading(false);
    }
  };

  // Add a new order at the top
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    // Optionally, you could also update cachedPages if you want consistency
    setCachedPages((prev) => {
      const newCache = { ...prev };
      Object.keys(newCache).forEach((page) => {
        newCache[page] = [order, ...newCache[page]];
      });
      return newCache;
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        addOrder,
        totalPages,
        loading,
        error,
        ORDERS_PER_PAGE,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};