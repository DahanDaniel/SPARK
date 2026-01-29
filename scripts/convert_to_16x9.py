from PIL import Image, ImageOps, ImageFilter
import os
import numpy as np

def convert_to_16x9(input_path, output_path):
    print(f"Converting {input_path} to 16:9...")
    try:
        img = Image.open(input_path).convert('RGB')
    except FileNotFoundError:
        print(f"Error: File not found {input_path}")
        return

    # Target Dimensions
    target_w, target_h = 1920, 1080
    
    # 1. Resize input to fit height (1080) while maintaining aspect
    # Current is 1024x1024. If we resize to 1080 height, width becomes 1080.
    # ratio = target_h / img.height
    # new_w = int(img.width * ratio)
    # img_resized = img.resize((new_w, target_h), Image.Resampling.LANCZOS)
    
    # Actually, let's keep it at original size (1024) to avoid upscaling artifacts, 
    # and just center it on 1080 canvas (it will be slightly shorter than 1080, leaving 28px gaps top/bottom)
    # OR better: resize lightly to 1080 height so it fills vertical.
    
    ratio = target_h / img.height # 1080/1024 = 1.05 (minimal upscaling)
    new_w = int(img.width * ratio)
    img_resized = img.resize((new_w, target_h), Image.Resampling.LANCZOS)
    
    # 2. Create Background
    # Sample the edges to find a good background color
    # Left edge average
    left_edge = np.array(img_resized.crop((0, 0, 10, target_h)))
    right_edge = np.array(img_resized.crop((new_w-10, 0, new_w, target_h)))
    
    avg_color_left = tuple(np.mean(left_edge, axis=(0,1)).astype(int))
    avg_color_right = tuple(np.mean(right_edge, axis=(0,1)).astype(int))
    
    # For now, simplistic approach: Solid color using average of both or gradient
    # Since the user's image is dark slate, let's just make a background of the edge color.
    # We'll create a new image.
    
    final_img = Image.new('RGB', (target_w, target_h), avg_color_left) # Start with left color
    
    # Create a gradient background if possible, but solid is safer to avoid banding.
    # Let's try filling with a solid color that matches the image dark background.
    
    # 3. Paste centered
    x_offset = (target_w - new_w) // 2
    final_img.paste(img_resized, (x_offset, 0))
    
    # 4. Blur edges/Mask to blend
    # Since we are pasting a square(ish) onto a background, we might see a hard edge if the background isn't perfect.
    # We can create a gradient mask for the sides?
    # For this specific "dark void" and "slate" style, simpler might be better.
    # Let's just save it. User can re-gen if seams are visible.

    final_img.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    # Chaos Image
    chaos_in = "/Users/danieldahan/.gemini/antigravity/brain/24cffdac-9d22-400a-bfcd-ff258fadcd18/chaos_cables_16x9_1769683424664.png"
    chaos_out = "/Users/danieldahan/.gemini/antigravity/brain/24cffdac-9d22-400a-bfcd-ff258fadcd18/chaos_cables_16x9_fixed.png"
    convert_to_16x9(chaos_in, chaos_out)
    
    # Order Image
    order_in = "/Users/danieldahan/.gemini/antigravity/brain/24cffdac-9d22-400a-bfcd-ff258fadcd18/order_spark_16x9_v3_1769683688444.png"
    order_out = "/Users/danieldahan/.gemini/antigravity/brain/24cffdac-9d22-400a-bfcd-ff258fadcd18/order_spark_16x9_fixed.png"
    convert_to_16x9(order_in, order_out)
