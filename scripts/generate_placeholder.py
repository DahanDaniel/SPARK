from PIL import Image
import os
import glob

def generate_crossfade(start_path, end_path, output_dir, frames=100):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Loading images...")
    # Add error handling to list files if not found
    if not os.path.exists(start_path):
        print(f"ERROR: Start image not found at {start_path}")
        print("Available files:", glob.glob(os.path.dirname(start_path) + "/*.png"))
        return
        
    img_start = Image.open(start_path).convert('RGB')
    img_end = Image.open(end_path).convert('RGB')

    # Ensure same size (resize end to start)
    if img_start.size != img_end.size:
        img_end = img_end.resize(img_start.size, Image.Resampling.LANCZOS)

    print(f"Generating {frames} cross-fade frames...")
    
    for i in range(frames):
        alpha = i / (frames - 1)
        # Linear interpolation
        blended = Image.blend(img_start, img_end, alpha)
        
        # Save as webp
        # Resize to max 1920 width for performance
        if blended.width > 1920:
             ratio = 1920 / blended.width
             new_size = (1920, int(blended.height * ratio))
             blended = blended.resize(new_size, Image.Resampling.LANCZOS)

        filename = f"frame_{i:04d}.webp"
        blended.save(os.path.join(output_dir, filename), 'WEBP', quality=80)
        
        if i % 10 == 0:
            print(f"Generated frame {i}/{frames}...", end='\r')

    print(f"\nDone! Saved to {output_dir}")

if __name__ == "__main__":
    # Update with the new V2 paths (I will dynamically find them)
    # But for the script content, I will use a glob search or the known V2 names
    # Using the exact names I just used in generate_image
    
    # NOTE: The generate_image tool adds a timestamp, so I'll need to find the file dynamically in the python script
    # to avoid hardcoding the wrong timestamp.
    
    brain_dir = "/Users/danieldahan/.gemini/antigravity/brain/24cffdac-9d22-400a-bfcd-ff258fadcd18"
    
    # Find latest chaos_cables_v2
    start_files = glob.glob(os.path.join(brain_dir, "chaos_cables_v2*.png"))
    start_img = sorted(start_files)[-1] if start_files else None
    
    # Find latest order_spark_v2
    end_files = glob.glob(os.path.join(brain_dir, "order_spark_v2*.png"))
    end_img = sorted(end_files)[-1] if end_files else None
    
    if not start_img or not end_img:
        print("Error: Could not find generated images.")
        if not start_img: print("Missing Start Image")
        if not end_img: print("Missing End Image")
    else:
        print(f"Using Start: {start_img}")
        print(f"Using End: {end_img}")
        out_dir = "/Users/danieldahan/Programming/SPARK/web_landing_page/src/images/sequence"
        generate_crossfade(start_img, end_img, out_dir)
