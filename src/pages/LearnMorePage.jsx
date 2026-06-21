import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import { getImage } from "../utils/imageLoader";

const LearnMorePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productsData.steps
    .flatMap((step) => step.items)
    .find((item) => item.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold text-gray-700">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
      >
        ← Back to catalog
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-center">
          <img
            src={getImage(product.image)}
            alt={product.name}
            className="w-full max-h-[400px] object-contain"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {product.price && (
            <div className="mb-8">
              <span className="text-sm text-gray-400 uppercase tracking-wider">
                Price
              </span>
              <p className="text-3xl font-bold text-[#4E2FD2]">
                ${product.price}
              </p>
            </div>
          )}

          {product.variants?.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Available Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:border-indigo-600 hover:text-indigo-600 transition-all cursor-default"
                  >
                    {v.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
