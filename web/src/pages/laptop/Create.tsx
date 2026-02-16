import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createLaptop } from "../../ultis/api";

type FormState = {
  code: string;
  name: string;
  type: string;
  inches: string;
  screen: string;
  memory: string;
  os: string;
  weight: string;
  unitPrice: string;
  unitsInStock: string;
};

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    code: "",
    name: "",
    type: "",
    inches: "",
    screen: "",
    memory: "",
    os: "",
    weight: "",
    unitPrice: "",
    unitsInStock: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target as HTMLInputElement;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.code.trim() || !form.name.trim()) {
      setError("Code và Name là bắt buộc.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        code: form.code,
        name: form.name,
        type: form.type || null,
        inches: form.inches ? Number(form.inches) : null,
        screen: form.screen || null,
        cpuId: null,
        gpuId: null,
        memory: form.memory ? Number(form.memory) : null,
        os: form.os || null,
        weight: form.weight ? Number(form.weight) : null,
        categoryId: null,
        supplierId: null,
        unitPrice: form.unitPrice ? Number(form.unitPrice) : null,
        unitsInStock: form.unitsInStock ? Number(form.unitsInStock) : null,
      } as any;

      await createLaptop(payload);

      navigate("/LaptopList");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Laptop</h1>
        <Link to="/LaptopList" className="text-sm text-gray-600">
          Back
        </Link>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Code *</label>
          <input
            name="code"
            value={form.code}
            onChange={onChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Type</label>
            <input
              name="type"
              value={form.type}
              onChange={onChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Screen (inches)</label>
            <input
              name="inches"
              value={form.inches}
              onChange={onChange}
              type="number"
              step="0.1"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Resolution</label>
          <input
            name="screen"
            value={form.screen}
            onChange={onChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Memory (GB)</label>
            <input
              name="memory"
              value={form.memory}
              onChange={onChange}
              type="number"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Unit price</label>
            <input
              name="unitPrice"
              value={form.unitPrice}
              onChange={onChange}
              type="number"
              step="0.01"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              name="unitsInStock"
              value={form.unitsInStock}
              onChange={onChange}
              type="number"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">OS</label>
            <input
              name="os"
              value={form.os}
              onChange={onChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Weight (kg)</label>
            <input
              name="weight"
              value={form.weight}
              onChange={onChange}
              type="number"
              step="0.01"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </button>

          <Link to="/LaptopList" className="px-4 py-2 border rounded text-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
