import React from 'react';
import { Edit, Trash2, AlertCircle, PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductList = ({ products, loading, error, onDelete }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-400 font-medium">กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-6 max-w-2xl mx-auto flex items-center gap-3 text-white">
        <AlertCircle className="w-6 h-6 shrink-0" />
        <span>{error || 'เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า'}</span>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-base-100 rounded-2xl shadow-sm border border-base-200 text-center px-4">
        <div className="p-4 bg-base-200 rounded-full mb-4 text-gray-400">
          <PackageX className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-bold text-base-content mb-1">ไม่พบรายการสินค้า</h3>
        <p className="text-gray-400 max-w-sm mb-6 text-sm">ยังไม่มีสินค้าในระบบ คุณสามารถเริ่มเพิ่มสินค้าใหม่ได้ทันที</p>
        <Link to="/product/new" className="btn btn-primary text-white btn-sm px-6">
          เพิ่มสินค้าใหม่
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 overflow-hidden flex flex-col">
          <figure className="relative h-48 bg-base-200 overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                ไม่มีรูปภาพ
              </div>
            )}
            <div className="absolute top-3 right-3 badge badge-primary font-bold shadow">
              ฿{Number(product.price).toLocaleString()}
            </div>
          </figure>
          <div className="card-body p-5 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="card-title font-bold text-lg text-base-content line-clamp-1 mb-2" title={product.name}>
                {product.name}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                {product.description || 'ไม่มีรายละเอียดสินค้า'}
              </p>
            </div>
            <div className="card-actions justify-end gap-2 mt-6 pt-4 border-t border-base-200">
              <Link to={`/product/${product.id}/edit`} className="btn btn-warning btn-sm gap-1.5 text-white">
                <Edit className="w-4 h-4" /> แก้ไข
              </Link>
              <button onClick={() => onDelete(product)} className="btn btn-error btn-sm gap-1.5 text-white">
                <Trash2 className="w-4 h-4" /> ลบ
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;