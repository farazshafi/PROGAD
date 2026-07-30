import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getNewArrivalsProductApi } from "../api/productApi";

import { useEffect, useState } from "react";

// const newArrivals = [
//   {
//     id: 1,
//     name: "Sony WH-1000XM6",
//     price: 399,
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     featured: true,
//   },
//   {
//     id: 2,
//     name: "JBL Flip 7",
//     price: 129,
//     image: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
//   },
//   {
//     id: 3,
//     name: "Galaxy Buds",
//     price: 149,
//     image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
//   },
//   {
//     id: 4,
//     name: "AirPods Max",
//     price: 549,
//     image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
//   },
//   {
//     id: 5,
//     name: "Marshall Speaker",
//     price: 299,
//     image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
//   },
// ];

export default function NewArrivalSection() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const others = newArrivals.slice(1);

  const navigate = useNavigate();

  async function getNewArrivals() {
    const response = await getNewArrivalsProductApi(5);
    if (response) {
      setNewArrivals(response);
      setFeatured(response[0]);
    }
  }

  const handleFeatureNavigate = () => {
    console.log("featred image clicked ", featured);
    navigate(`/product_details/${featured.id}`)
  };

  useEffect(() => {
    getNewArrivals();
  }, []);

  console.log("new arrival lenght", newArrivals.length);
  if (newArrivals.length > 0) {
    return (
      <section className="mx-auto  max-w-full px-4 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-xl lg:p-7">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-orange-500 font-medium">Featured</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                New Arrivals
              </h2>
            </div>

            <button
              onClick={() => navigate("/new_arrivals")}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-orange-500"
            >
              View All
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            {/* Featured */}

            <motion.div
              onClick={handleFeatureNavigate}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-3xl bg-zinc-800"
            >
              <div className="aspect-[5/5] overflow-hidden">
                <img
                  src={featured.image}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="space-y-2 p-6">
                <h3 className="text-xl font-semibold text-white">
                  {featured.name}
                </h3>

                <p className="text-orange-500 font-bold">${featured.price}</p>
              </div>
            </motion.div>

            {/* Grid */}

            <div className="grid grid-cols-2 gap-6">
              {others.map((product) => (
                <motion.div
                  onClick={() => navigate(`/product_details/${product.id}`)}
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="group overflow-hidden rounded-3xl bg-zinc-800"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="space-y-1 p-4">
                    <h3 className="truncate text-white font-medium">
                      {product.name}
                    </h3>

                    <p className="font-semibold text-orange-500">
                      ${product.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <>There is no new arrivals</>;
  }
}
