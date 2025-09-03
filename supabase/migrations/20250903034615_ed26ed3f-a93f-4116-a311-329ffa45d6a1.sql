-- Fix product image URLs to use public folder paths
UPDATE products 
SET image_url = CASE 
  WHEN image_url = '/src/assets/drill.jpg' THEN '/images/drill.jpg'
  WHEN image_url = '/src/assets/hammer.jpg' THEN '/images/hammer.jpg'
  WHEN image_url = '/src/assets/led-bulb.jpg' THEN '/images/led-bulb.jpg'
  WHEN image_url = '/src/assets/measuring-tape.jpg' THEN '/images/measuring-tape.jpg'
  WHEN image_url = '/src/assets/paint-brush.jpg' THEN '/images/paint-brush.jpg'
  WHEN image_url = '/src/assets/screwdriver-set.jpg' THEN '/images/screwdriver-set.jpg'
  ELSE image_url
END
WHERE image_url LIKE '/src/assets/%';