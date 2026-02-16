import { Link, useParams, useNavigate } from "react-router";
import { useLaptop } from "../../hooks/useLaptop";
import type { Laptop } from "../../types/laptop";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { laptop, loading, error, remove } = useLaptop(id);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-red-600">
        Error: {error}
        <div className="mt-4">
          <Link to="/LaptopList" className="text-sm text-gray-600">
            Back
          </Link>
        </div>
      </div>
    );
  if (!laptop) return <div className="p-8">Laptop not found</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Laptop detail</h1>
        <div className="flex items-center gap-2">
          <Link
            to={`/LaptopList/${laptop.Id}/edit`}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>
          <button
            onClick={async () => {
              if (!confirm("Bạn có chắc muốn xóa laptop này?")) return;
              try {
                await remove();
                navigate("/LaptopList");
              } catch (err) {
                alert(err instanceof Error ? err.message : "Delete failed");
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
          <Link to="/LaptopList" className="text-sm text-gray-600">
            Back
          </Link>
        </div>
      </div>

      <div className="border rounded p-4 space-y-2">
        <div className="text-lg font-semibold">{laptop.Name}</div>
        <div className="text-sm text-gray-600">Code: {laptop.Code}</div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>Type: {laptop.Type ?? "N/A"}</div>
          <div>Screen: {laptop.Inches ?? "N/A"}&quot;</div>
          <div>Resolution: {laptop.ScreenResolution ?? "N/A"}</div>
          <div>Memory: {laptop.Memory ?? "N/A"} GB</div>
          <div>OS: {laptop.OpSys ?? "N/A"}</div>
          <div>Weight: {laptop.Weight ?? "N/A"} kg</div>
          <div className="text-lg font-semibold text-blue-600">
            ${laptop.UnitPrice ?? "N/A"}
          </div>
          <div className="text-sm text-gray-500">
            Stock: {laptop.UnitsInStock ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
