import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppImage from "../components/common/AppImage";
import CartIcon from "../components/common/CartIcon";
export default function Menu() {
  const [filter, setFilter] = useState("*");

  const menuItems = [
    { id: 1, category: "pizza", name: "פיצה טעימה", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר." ,price: 20, img: "f1.png" },
    { id: 2, category: "burger", name: "בורגיר טעים",description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר.", price: 15, img: "f2.png" },
    { id: 3, category: "pizza", name: "פיצה טעימה", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר.", price: 17, img: "f3.png" },
    { id: 4, category: "pasta", name: "פאסטה טעימה", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר.",  price: 18, img: "f4.png" },
    { id: 5, category: "fries", name: "ציפס", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר." , price: 10, img: "f5.png" },
    { id: 6, category: "pizza", name: "פיצה טעימה", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר.",price: 15, img: "f6.png" },
    { id: 7, category: "burger", name: "בורגיר טעים", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר." , price: 12, img: "f7.png" },
    { id: 8, category: "burger", name: "בורגיר טעים", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר." , price: 14, img: "f8.png" },
    { id: 9, category: "pasta", name: "פאסטה טעימה", description: "הפיצה שלנו טרייה במיוחד, עם גבינה נמתחת, רוטב עשיר ועשוי בית, בצק אוורירי ותוספות איכותיות שיוצרות טעם מושלם וממכר.", price: 10, img: "f9.png" },
  ];

  const filters = [
    { label: "הכל", value: "*" },
    { label: "בורגיר", value: "burger" },
    { label: "פיצה", value: "pizza" },
    { label: "באסתה", value: "pasta" },
    { label: "מתוגנים", value: "fries" },
  ];

  const filteredItems = menuItems.filter(
    (item) => filter === "*" || item.category === filter
  );

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>התפריט שלנו</h2>
        </div>

        {/* Filter menu */}
        <ul className="filters_menu">
          {filters.map((f) => (
            <li
              key={f.value}
              className={filter === f.value ? "active" : ""}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </li>
          ))}
        </ul>

        <div className="filters-content">
          <div className="row grid">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className={`col-sm-6 col-lg-4 all ${item.category}`}
                >
                  <div className="box">
                    <div className="img-box">
                      <AppImage src={`./src/images/${item.img}`} alt={item.name}/>
                    </div>
                    <div className="detail-box">
                      <h5>{item.name}</h5>
                      <p>
                          {item.description}
                      </p>
                      <div className="options">
                        <h6>${item.price}</h6>
                        <a href="#">
                          <CartIcon width={24} height={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="btn-box">
          <a href="">View More</a>
        </div>
      </div>
    </section>
  );
}