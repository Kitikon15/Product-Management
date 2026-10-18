import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getProducts, deleteProduct } from "../service/productService";
import alertService from "../service/alertService";
import { Plus, Package, AlertCircle } from "lucide-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const location = useLocation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      alertService.success(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    try {
      setIsDeleting(true);
      await deleteProduct(selectedProduct.id);
      alertService.success("ลบสินค้าเรียบร้อยแล้ว!");
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alertService.error(err.message || "เกิดข้อผิดพลาดในการลบสินค้า");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-base-content">รายการสินค้าทั้งหมด</h1>
            <p className="text-xs sm:text-sm text-gray-400">จัดการรายการสินค้า ราคา และรายละเอียดในระบบ</p>
          </div>
        </div>
        <Link to="/product/new" className="btn btn-primary text-white gap-2 shadow-md hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> เพิ่มสินค้าใหม่
        </Link>
      </div>

      <ProductList
        products={products}
        loading={loading}
        error={error}
        onDelete={(product) => setSelectedProduct(product)}
      />

      {selectedProduct && (
        <dialog className="modal modal-open bg-black/50">
          <div className="modal-box max-w-md border border-base-200 shadow-2xl">
            <div className="flex items-center gap-3 text-error mb-2">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-lg">ยืนยันการลบสินค้า</h3>
            </div>
            <p className="py-2 text-gray-300">
              คุณต้องการลบสินค้า <span className="font-bold text-white">"{selectedProduct.name}"</span> ใช่หรือไม่?
            </p>
            <p className="text-xs text-error/80">* การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
            <div className="modal-action gap-2 pt-2">
              <button
                onClick={() => setSelectedProduct(null)}
                disabled={isDeleting}
                className="btn btn-ghost btn-sm"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="btn btn-error btn-sm text-white">
                {isDeleting ? "กำลังลบ..." : "ลบสินค้า"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
};

export default ProductPage;
