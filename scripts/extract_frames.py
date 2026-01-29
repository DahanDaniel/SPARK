import cv2
import os
import argparse

def extract_frames(video_path, output_dir, max_width=1920):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    vidcap = cv2.VideoCapture(video_path)
    success, image = vidcap.read()
    count = 0
    
    print(f"Extracting frames from {video_path} to {output_dir}...")
    
    while success:
        # Resize if width > max_width
        height, width = image.shape[:2]
        if width > max_width:
            scaling_factor = max_width / float(width)
            new_height = int(height * scaling_factor)
            image = cv2.resize(image, (max_width, new_height), interpolation=cv2.INTER_AREA)

        # Save as optimized webp
        frame_path = os.path.join(output_dir, f"frame_{count:04d}.webp")
        cv2.imwrite(frame_path, image, [cv2.IMWRITE_WEBP_QUALITY, 80])
        
        success, image = vidcap.read()
        count += 1
        
        if count % 10 == 0:
            print(f"Extracted {count} frames...", end='\r')

    print(f"\nDone! Extracted {count} frames.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Extract frames from video.')
    parser.add_argument('--input', required=True, help='Path to input video file')
    parser.add_argument('--output', required=True, help='Path to output directory')
    args = parser.parse_args()

    extract_frames(args.input, args.output)
