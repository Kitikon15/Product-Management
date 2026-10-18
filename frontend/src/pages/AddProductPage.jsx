import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../service/productService";
import alertService from "../service/alertService";
import { AlertCircle } from "lucide-react";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("กรุณากรอกชื่อสินค้า");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("กรุณากรอกราคาให้ถูกต้อง (มากกว่า 0)");
      return;
    }

    try {
      setIsSubmitting(true);
      await createProduct({
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });
      alertService.success("เพิ่มสินค้าสำเร็จ!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาดในการเพิ่มสินค้า");
      alertService.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-base-content">เพิ่มสินค้าใหม่</h1>
        <p className="mt-1 text-sm text-gray-400">
          กรอกข้อมูลสินค้าด้านล่างเพื่อเพิ่มเข้าสู่ระบบ
        </p>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg mb-6 max-w-xl mx-auto flex items-center gap-3 text-white">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ProductForm
        name={name}
        price={price}
        description={description}
        image={image}
        isSubmitting={isSubmitting}
        onNameChange={setName}
        onPriceChange={setPrice}
        onDescriptionChange={setDescription}
        onImageChange={setImage}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </main>
  );
};

export default AddProductPage;