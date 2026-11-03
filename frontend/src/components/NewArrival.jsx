import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

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

  if (newArrivals.length > 0) {
    return (
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="home-arrivals mx-auto max-w-[1240px] px-4 lg:px-8"
      >
        <div className="home-arrivals-shell rounded-[24px] border border-white/10 bg-gradient-to-br from-[#17191c] to-[#101113] p-4 shadow-[0_20px_65px_rgba(0,0,0,.25)] lg:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-medium uppercase tracking-[.22em] text-orange-400 text-xs">Featured collection</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                New Arrivals
              </h2>
            </div>

            <button
              onClick={() => navigate("/new_arrivals")}
              className="home-arrivals-view-all flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-orange-400/50 hover:bg-orange-500"
            >
              View All
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
            {/* Featured */}

            <motion.div
              onClick={handleFeatureNavigate}
              whileHover={{ y: -5 }}
              className="home-arrivals-feature group overflow-hidden rounded-2xl bg-zinc-800"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={featured.image}
                alt={featured.name}
                  className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1 p-4">
                <h3 className="text-xl font-semibold text-white">
                  {featured.name}
                </h3>

                <p className="text-orange-500 font-bold">${featured.price}</p>
              </div>
            </motion.div>

            {/* Grid */}

            <div className="grid grid-cols-2 gap-4">
              {others.map((product) => (
                <motion.div
                  onClick={() => navigate(`/product_details/${product.id}`)}
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="home-arrivals-card group overflow-hidden rounded-2xl bg-zinc-800"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                    alt={product.name}
                      className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1 px-3 pb-3 pt-2">
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
      </motion.section>
    );
  } else {
    return <>There is no new arrivals</>;
  }
}
