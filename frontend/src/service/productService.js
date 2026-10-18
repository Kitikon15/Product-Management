const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/products`;

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    let message = "เกิดข้อผิดพลาดในการเชื่อมต่อ";
    try {
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        message = data.message || data.error || message;
      } catch {
        if (text && text.trim()) {
          message = text;
        }
      }
    } catch (err) {
      console.error("Error reading response:", err);
    }
    throw new Error(message);
  }
  return response.json();
};

const getProducts = () => request(API_URL);
const getProduct = (id) => request(`${API_URL}/${id}`);
const createProduct = (product) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

const updateProduct = (id, product) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

const deleteProduct = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };