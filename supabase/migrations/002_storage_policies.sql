-- Storage policies for public read on all ScienceMines buckets

CREATE POLICY "Public read course-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-images');

CREATE POLICY "Public read product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Public read gallery-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Public read print-files"
ON storage.objects FOR SELECT
USING (bucket_id = 'print-files');

-- Admin upload (authenticated admin users)
CREATE POLICY "Admin upload course-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'course-images' AND is_admin());

CREATE POLICY "Admin upload product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Admin upload gallery-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery-images' AND is_admin());

CREATE POLICY "Admin update gallery-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery-images' AND is_admin());

CREATE POLICY "Admin delete gallery-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery-images' AND is_admin());
