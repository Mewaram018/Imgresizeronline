export const getCroppedImg = (imageSrc, cropAreaPixels, rotation = 0) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  // Create a new image
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const { x, y, width, height } = cropAreaPixels;
      canvas.width = width;
      canvas.height = height;

      // Apply the rotation
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotation * (Math.PI / 180)); // Convert degrees to radians
      ctx.drawImage(image, x, y, width, height, -width / 2, -height / 2, width, height);

      // Get base64 image URL
      const croppedImageUrl = canvas.toDataURL("image/png");
      resolve(croppedImageUrl); // Resolve with the base64 URL
    };
    
    image.onerror = reject;
  });
};
