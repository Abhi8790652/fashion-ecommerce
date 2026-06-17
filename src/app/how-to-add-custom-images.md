# How to Add Your WhatsApp Image to the About Page

## Step 1: Prepare the Image
1. Locate your image at:
   ```
   C:\Users\ak097\Downloads\WhatsApp Image 2025-03-29 at 20.36.14_2de45b9c.jpg
   ```

2. Copy this file (Ctrl+C)

## Step 2: Add the Image to Your Project
1. Open File Explorer
2. Navigate to your project folder:
   ```
   C:\Users\ak097\cruser\fashion-ecommerce\public\images\team\
   ```
3. Paste your image here (Ctrl+V)
4. Rename the file to `abhinit.jpg`

## Step 3: Update the Code
1. Open `src/app/about/page.tsx`
2. Find the team member with `id="pankaj"` (around line 177-190)
3. Change the image property to:
   ```jsx
   image="/images/team/abhinit.jpg"
   ```

## Step 4: Restart the Server
1. If the development server is already running, it should automatically detect the changes
2. If not, start it again with:
   ```
   cd fashion-ecommerce; npx.cmd next dev
   ```

3. Visit your website at:
   ```
   http://localhost:3000
   ```
   
   (Or at a different port if 3000 is taken, such as 3001, 3002, or 3003)

## Troubleshooting
1. If the image doesn't appear, make sure:
   - The image is correctly named (`abhinit.jpg`) 
   - The image is placed in the correct folder (`public/images/team/`)
   - The path in the code is exactly `/images/team/abhinit.jpg`

2. If you still see errors, try:
   - Refreshing the browser (Ctrl+F5)
   - Restarting the development server
   - Making sure the image is a valid JPG format 