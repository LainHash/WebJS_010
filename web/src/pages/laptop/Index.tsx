import { Link } from "react-router";
import type { Laptop } from "../../types/laptop";
import { useLaptops } from "../../hooks/useLaptops";

export default function Index() {
  const { laptops, loading, error, refresh, remove } = useLaptops();

  if (loading) return <div className="p-8">Loading laptops...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Laptop List</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => void refresh()}
            className="px-3 py-2 border rounded text-sm bg-white hover:bg-gray-50"
            type="button"
          >
            Refresh
          </button>

          <Link
            to="/LaptopList/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </Link>
        </div>
      </div>

      {laptops.length === 0 ? (
        <p className="text-gray-500">No laptops available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops.map((l) => (
            <article
              key={l.Id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <div className="h-44 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="text-gray-300 text-xs">No image</div>
                </div>

                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs rounded-full px-2 py-1 border text-gray-700">
                  {l.Type || "N/A"}
                </div>

                <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-semibold rounded px-3 py-1">
                  {l.UnitPrice != null ? `$${l.UnitPrice}` : "—"}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2">{l.Name}</h3>
                <p className="text-sm text-gray-500 mt-1">Code: {l.Code}</p>

                <div className="mt-3 text-sm text-gray-600 grid grid-cols-2 gap-2">
                  <div>Screen: {l.Inches ?? "N/A"}&quot;</div>
                  <div>Memory: {l.Memory ?? "N/A"} GB</div>
                  <div>Resolution: {l.ScreenResolution || "N/A"}</div>
                  <div>Weight: {l.Weight ?? "N/A"} kg</div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    to={`/LaptopList/${l.Id}`}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                  >
                    Detail
                  </Link>

                  <Link
                    to={`/LaptopList/${l.Id}/edit`}
                    className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={async () => {
                      if (!confirm("Bạn có chắc muốn xóa laptop này?")) return;
                      try {
                        await remove(l.Id);
                      } catch (err) {
                        alert(
                          err instanceof Error ? err.message : "Delete failed",
                        );
                      }
                    }}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                    type="button"
                  >
                    Delete
                  </button>

                  <div className="ml-auto text-xs text-gray-400">
                    {l.OpSys || ""}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
