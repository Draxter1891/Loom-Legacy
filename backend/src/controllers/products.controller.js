import productModel from "../model/product.model.js";
import { uploadFileImgkt } from "../services/storage.service.js";

export const createProductController = async (req, res) => {
  const fileUrls = [];
  for (let i = 0; i < req.files.length; i++) {
    const response = await uploadFileImgkt({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
      productTitle: req.body.title,
    });
    if (!response) {
      return res.status(400).json({
        message: "Failed to upload product images",
      });
    }
    // fileUrls.push({
    //   imageUrl: response.url,
    //   thumbnailUrl: response.thumbnailUrl,
    // });
    fileUrls.push(response.url);
  }
  console.log(fileUrls);

  const newProduct = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: fileUrls,
    sellerID: req.user.userId,
  });

  res.status(200).json({
    message: "dummy response",
    data: [newProduct],
  });
};

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      message: "All products fetched successfully",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Something went wrong, we can't fetch products right now. Please try later.",
    });
  }
};
