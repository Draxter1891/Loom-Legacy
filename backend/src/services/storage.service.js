import imagekit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/env.js";

const client = new imagekit({
  privateKey: config.IMAGEKIT_PVT_URL,
});

export const uploadFileImgkt = async ({ buffer, fileName, productTitle }) => {
    const normalizedTitle = productTitle.split(" ").join("-");
  const response = await client.files.upload({
    file: await toFile(buffer),
    fileName: fileName,
    folder: `/loom_and_legacy/products/${normalizedTitle}`,
  });

  return response;
};
