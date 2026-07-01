import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Save, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Product State
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: "",
    title: "",
    description: "",
    price: "",
    image: "",
    category: "Drumsticks",
    moq: "1",
  });

  // Edit State for existing products
  const [editingProducts, setEditingProducts] = useState<Record<string, any>>({});
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

  function handleEdit(id: string, field: string, value: any) {
    setEditingProducts(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, productId?: string) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImageId(productId || 'new');
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      alert(`Error uploading image: ${uploadError.message}. Make sure the 'product-images' storage bucket exists and is PUBLIC!`);
      setUploadingImageId(null);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    if (productId) {
      handleEdit(productId, 'image', publicUrl);
    } else {
      setNewProduct({ ...newProduct, image: publicUrl });
    }
    
    setUploadingImageId(null);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("code");
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  async function saveProductChanges(id: string) {
    const changes = editingProducts[id];
    if (!changes) return;

    const updatePayload = { ...changes };
    if (updatePayload.price !== undefined) {
      updatePayload.price = parseFloat(updatePayload.price);
      if (isNaN(updatePayload.price)) return alert("Invalid price");
    }
    if (updatePayload.moq !== undefined) {
      updatePayload.moq = parseInt(updatePayload.moq, 10);
      if (isNaN(updatePayload.moq)) return alert("Invalid MOQ");
    }

    const { error } = await supabase.from("products").update(updatePayload).eq("id", id);
    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, ...updatePayload } : p));
      setEditingProducts(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      console.error(error);
      alert(`Failed to save changes.`);
    }
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    const price = parseFloat(newProduct.price);
    if (isNaN(price)) return alert("Invalid price");
    
    const moq = parseInt(newProduct.moq, 10) || 1;

    const { data, error } = await supabase
      .from("products")
      .insert([{
        code: newProduct.code,
        title: newProduct.title,
        description: newProduct.description,
        price,
        moq,
        image: newProduct.image || null,
        category: newProduct.category || 'Drumsticks',
      }])
      .select()
      .single();

    if (!error && data) {
      setProducts([...products, data].sort((a, b) => a.code.localeCompare(b.code)));
      setIsAdding(false);
      setNewProduct({ code: "", title: "", description: "", price: "", image: "", category: "Drumsticks", moq: "1" });
    } else {
      console.error(error);
      alert("Failed to add product. Make sure you have run the ALTER TABLE sql to add the moq column!");
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
      setEditingProducts(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      alert("Failed to delete product. It might be linked to existing orders.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Manage Products</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-gold text-[#0A0A0A] font-bold rounded hover:bg-gold-hover transition"
        >
          {isAdding ? "Cancel" : <><Plus size={18} /> Add Product</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4 text-gold">Create New Product</h2>
          <form onSubmit={addProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">Code / SKU</label>
                <input required value={newProduct.code} onChange={e => setNewProduct({...newProduct, code: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold" placeholder="e.g. 5A" />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">Category</label>
                <input required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold" placeholder="e.g. Drumsticks" />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">Price (₦)</label>
                <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold" placeholder="15000" />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">MOQ</label>
                <input required type="number" min="1" step="1" value={newProduct.moq} onChange={e => setNewProduct({...newProduct, moq: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold" placeholder="1" />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">Title</label>
                <input required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold" placeholder="e.g. Zenbeatz 5A Drumsticks" />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">Product Image</label>
                
                {newProduct.image && (
                  <div className="w-full h-48 mb-3 bg-black rounded border border-white/10 overflow-hidden relative group">
                    <img src={newProduct.image} className="w-full h-full object-cover" alt="New product preview" />
                  </div>
                )}
                
                <div className="flex gap-2 items-center">
                  <input value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="flex-1 bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold" placeholder="https://example.com/image.jpg" />
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload Image" />
                    <button type="button" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded border border-white/20 text-white font-bold transition whitespace-nowrap flex gap-2 items-center">
                      <ImageIcon size={16} />
                      {uploadingImageId === 'new' ? 'Uploading...' : 'Upload File'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-1">Description</label>
              <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-gold h-24 resize-none" placeholder="Product description..." />
            </div>
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-gold text-[#0A0A0A] font-bold rounded hover:bg-gold-hover transition">
              <Save size={18} /> Save Product
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-white/50 animate-pulse">Loading products...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isEditing = !!editingProducts[product.id];
            const currentImage = editingProducts[product.id]?.image ?? product.image;
            
            return (
              <div key={product.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col relative overflow-hidden group">
                
                {/* Thumbnail Display */}
                <div className="w-full h-40 mb-4 bg-black/50 rounded-lg overflow-hidden border border-white/5 relative">
                  {currentImage ? (
                    <img src={currentImage} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" alt={product.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <ImageIcon size={32} />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div className="w-full flex gap-2">
                    <div className="flex-1">
                      <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">Code</label>
                      <input
                        value={editingProducts[product.id]?.code ?? product.code}
                        onChange={(e) => handleEdit(product.id, "code", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2 py-1 text-gold text-xs font-bold outline-none focus:border-gold transition mb-2"
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">Category</label>
                      <input
                        value={editingProducts[product.id]?.category ?? product.category ?? "Drumsticks"}
                        onChange={(e) => handleEdit(product.id, "category", e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white text-xs font-bold outline-none focus:border-gold transition mb-2"
                      />
                    </div>
                  </div>
                </div>
                
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">Title</label>
                <input
                  value={editingProducts[product.id]?.title ?? product.title}
                  onChange={(e) => handleEdit(product.id, "title", e.target.value)}
                  className="w-full bg-black border border-white/10 rounded px-2 py-1 text-white font-bold outline-none focus:border-gold transition mb-4"
                />

                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">Description</label>
                <textarea
                  value={editingProducts[product.id]?.description ?? product.description ?? ""}
                  onChange={(e) => handleEdit(product.id, "description", e.target.value)}
                  className="w-full bg-black border border-white/10 rounded px-2 py-1 text-sm text-white/80 outline-none focus:border-gold transition h-20 resize-none mb-4"
                />

                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">Product Image</label>
                <div className="flex gap-2 items-center mb-4">
                  <input
                    value={editingProducts[product.id]?.image ?? product.image ?? ""}
                    onChange={(e) => handleEdit(product.id, "image", e.target.value)}
                    className="flex-1 w-full bg-black border border-white/10 rounded px-2 py-1 text-sm text-white/80 outline-none focus:border-gold transition"
                    placeholder="Image URL"
                  />
                  <div className="relative shrink-0">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, product.id)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload Image" />
                    <button type="button" className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded border border-white/20 text-white text-xs font-bold transition whitespace-nowrap h-[30px] flex items-center justify-center">
                      {uploadingImageId === product.id ? '...' : 'Upload'}
                    </button>
                  </div>
                </div>
                
                <div className="mt-auto border-t border-white/10 pt-4 flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProducts[product.id]?.price ?? product.price}
                      onChange={(e) => handleEdit(product.id, "price", e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white font-bold outline-none focus:border-gold transition"
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-1">MOQ</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={editingProducts[product.id]?.moq ?? product.moq ?? 1}
                      onChange={(e) => handleEdit(product.id, "moq", e.target.value)}
                      className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white font-bold outline-none focus:border-gold transition text-center"
                    />
                  </div>
                  
                  {isEditing ? (
                    <button 
                      onClick={() => saveProductChanges(product.id)}
                      className="h-10 px-4 bg-gold text-[#0A0A0A] font-bold rounded hover:bg-gold-hover transition shadow-gold flex items-center justify-center whitespace-nowrap"
                    >
                      <Save size={16} className="mr-2" /> Save
                    </button>
                  ) : (
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="h-10 px-4 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition flex items-center justify-center"
                      title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
