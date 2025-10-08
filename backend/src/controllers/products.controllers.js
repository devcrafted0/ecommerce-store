export const getProducts = async (req, res) => {
  try {
    const {
      category = "",
      deals,
      minPrice = 0,
      maxPrice = 0,
      page = 1,
      limit = 20,
    } = req.body; // 👈 if you’re sending JSON, use req.body

    const filters = {};

    // ✅ Category: only apply if non-empty
    if (category.trim() !== "") {
      filters.category = category.trim();
    }

    // ✅ Deals: include both true and false
    if (typeof deals === "boolean") {
      filters.deals = deals;
    }

    // ✅ Price: handle numeric 0 properly
    const hasMin = minPrice !== undefined && minPrice !== 0;
    const hasMax = maxPrice !== undefined && maxPrice !== 0;

    if (hasMin && hasMax) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    } else if (hasMin) {
      filters.price = { $gte: minPrice };
    } else if (hasMax) {
      filters.price = { $lte: maxPrice };
    }

    const products = await Product.find(filters)
      .sort({ price: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, count: products.length, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};