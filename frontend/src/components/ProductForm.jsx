import React from 'react';
import { Save, X, Loader2 } from 'lucide-react';

const ProductForm = ({
  editingId,
  name,
  price,
  description,
  image,
  isSubmitting,
  onNameChange,
  onPriceChange,
  onDescriptionChange,
  onImageChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl mx-auto bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
      <div className="form-control">
        <label className="label font-medium">
          <span className="label-text font-semibold">ชื่อสินค้า <span className="text-error">*</span></span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
          className="input input-bordered w-full focus:input-primary"
          placeholder="ระบุชื่อสินค้า..."
        />
      </div>

      <div className="form-control">
        <label className="label font-medium">
          <span className="label-text font-semibold">ราคา (บาท) <span className="text-error">*</span></span>
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          required
          className="input input-bordered w-full focus:input-primary"
          placeholder="0.00"
        />
      </div>

      <div className="form-control">
        <label className="label font-medium">
          <span className="label-text font-semibold">URL รูปภาพ</span>
        </label>
        <input
          type="url"
          value={image}
          onChange={(e) => onImageChange(e.target.value)}
          className="input input-bordered w-full focus:input-primary"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-control">
        <label className="label font-medium">
          <span className="label-text font-semibold">รายละเอียดสินค้า</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="textarea textarea-bordered h-24 focus:textarea-primary"
          placeholder="ระบุรายละเอียดสินค้าเพิ่มเติม..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary flex-1 text-white gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {editingId ? 'อัปเดตสินค้า' : 'เพิ่มสินค้า'}
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="btn btn-ghost gap-2"
          >
            <X className="w-4 h-4" />
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;