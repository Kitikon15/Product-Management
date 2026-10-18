import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProduct, updateProduct } from "../service/productService";
import alertService from "../service/alertService";
import { AlertCircle } from "lucide-react";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProduct(id);
        if (data) {
          setName(data.name || "");
          setPrice(data.price ? String(data.price) : "");
          setDescription(data.description || "");
          setImage(data.image || "");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "ไม่สามารถโหลดข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
      await updateProduct(id, {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: image.trim(),
      });
      alertService.success("อัปเดตข้อมูลสินค้าสำเร็จ!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาดในการอัปเดตสินค้า");
      alertService.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-400 font-medium">กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-base-content">แก้ไขข้อมูลสินค้า</h1>
        <p className="mt-1 text-sm text-gray-400">
          ปรับปรุงข้อมูลสินค้าและกดบันทึกเพื่ออัปเดตระบบ
        </p>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg mb-6 max-w-xl mx-auto flex items-center gap-3 text-white">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <ProductForm
        editingId={id}
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

export default EditProductPage;