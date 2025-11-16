# VastuNaksha - Quick Setup & Customization Guide

## 🚀 Quick Start (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

Done! Your website is running.

---

## 🎨 Customization Checklist

### 1. **Update Company Info** (5 min)

Edit `/src/pages/Home.jsx`:

```javascript
// Line ~17: Update navbar brand
<span className="font-semibold text-lg text-black tracking-tight">
  YourCompanyName  // Change this
</span>

// Line ~80: Update hero section text
<h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
  Your Headline Here  // Change this
</h1>

// Line ~220-250: Update contact info
<p className="text-gray-600">+91 YOUR_PHONE_HERE</p>
<p className="text-gray-600">your_email@company.com</p>
```

### 2. **Update WhatsApp Number** (1 min)

Edit `/src/pages/DesignDetails.jsx`, line ~46:

```javascript
const phoneNumber = "919876543210"; // Replace with YOUR number
```

Format: Country code (91 for India) + phone number without +

### 3. **Add Your Company Logo** (2 min)

Replace the "V" logo in `/src/components/Navbar.jsx`:

**Option A: Use emoji**

```javascript
<span className="text-white font-bold text-lg">🏠</span>
```

**Option B: Use image**

```javascript
<img src="/your-logo.png" alt="Logo" className="w-8 h-8" />
```

Place logo image in `/public/your-logo.png`

### 4. **Update Design Data** (10 min)

Edit `/src/data/designsData.js`:

**Example design object:**

```javascript
{
  id: 1,
  category: "House Designs",
  title: "Modern Minimalist Home",
  image: "https://your-image-url.jpg",
  size: "30×60",
  description: "Your description here",
  highlights: {
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    parking: 1,
    area: "1500 sq.ft"
  }
}
```

**Image URLs to use:**

- Replace all `unsplash.com` URLs with your actual design images
- Format: `https://your-domain.com/design-1.jpg`
- Recommended size: 800×600px or larger

### 5. **Update Colors** (Optional, 10 min)

The theme uses: Black, White, Gray

To change the color scheme globally, edit:

- `/src/components/*.jsx` - Change `bg-black` to `bg-blue-600` etc.
- `/src/pages/*.jsx` - Update button colors, borders
- `/src/App.css` - Update animation colors if needed

Example: Change black to blue

```bash
Find & Replace in all .jsx files:
bg-black → bg-blue-600
text-black → text-blue-900
border-black → border-blue-600
```

### 6. **Update Hero Background Image** (2 min)

Edit `/src/pages/Home.jsx`, line ~62:

```javascript
src = "https://your-house-image.jpg"; // Change this
```

Recommended: High-quality modern house photo (1600×800px)

### 7. **Add Social Media Links** (3 min)

Edit `/src/pages/Home.jsx`, line ~330+ (footer section):

Update the social links:

```javascript
<a href="https://facebook.com/yourpage" className="...">
  {/* Facebook icon */}
</a>
```

Replace with your actual social media URLs.

### 8. **Update About Section** (5 min)

Edit `/src/pages/Home.jsx`, line ~220:

```javascript
<p className="text-gray-600">Your company description here</p>
```

Also update the "Why Choose Us" highlights:

```javascript
<h3 className="font-semibold text-lg text-black">Feature 1</h3>
<p className="text-gray-600">Description for your company</p>
```

---

## 📦 Deployment

### Deploy to Vercel (FREE, Recommended)

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Visit vercel.com and click "Import Project"
# 3. Select your GitHub repository
# 4. Click "Deploy"
# Done! Your site is live at your-project.vercel.app
```

### Deploy to Netlify (FREE)

```bash
# 1. Build the project
npm run build

# 2. Drag and drop the 'dist' folder to netlify.com
# 3. Done! Your site is live
```

### Deploy to GitHub Pages (FREE)

```bash
# 1. Update vite.config.js
# Change: base: '/' to base: '/repo-name/'

# 2. Build
npm run build

# 3. Push to GitHub
# 4. Enable GitHub Pages in repository settings
# 5. Done!
```

---

## 🎯 Advanced Customization

### Add New Design Category

1. Edit `/src/data/designsData.js` - Add category to designs
2. Edit `/src/pages/Home.jsx` - Add to categories array (line ~42)

```javascript
const categories = ['All', 'YourNewCategory', ...];
```

### Add Contact Form Backend

Currently forms don't send emails. To add email:

**Option 1: Use Formspree (Free)**

1. Visit formspree.io
2. Create form
3. Replace form action in Home.jsx

**Option 2: Use EmailJS**

```bash
npm install @emailjs/browser
```

Then integrate in your contact form.

### Add Product/Pricing Page

Create `/src/pages/Pricing.jsx` with similar structure to Home.jsx

Add route in `App.jsx`:

```javascript
<Route path="/pricing" element={<Pricing />} />
```

### Connect to Backend API

To save form data to database:

1. In `HeroForm.jsx`, replace localStorage with API call:

```javascript
fetch("https://your-api.com/submit-form", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

---

## 📊 Performance Tips

- Optimize images: Use online compressors
- Use next-gen formats: WebP instead of JPG
- Lazy load images: Already implemented for cards
- Minimize animations on mobile: Current setup is already optimized

---

## 🐛 Common Issues & Fixes

**Images broken?**

- Check URL is HTTPS, not HTTP
- Verify image exists at URL
- Use placeholder images from unsplash.com

**WhatsApp not working?**

- Format: +91XXXXXXXXXX
- Make sure number is valid
- Test on WhatsApp Web first

**Styling looks weird?**

- Clear browser cache: Ctrl+Shift+Delete
- Rebuild: `npm run build`
- Check TailwindCSS is imported in App.jsx

**Form not working?**

- Check browser console (F12)
- Verify all required fields filled
- Check JavaScript isn't disabled

---

## 📚 Useful Resources

- **React Docs**: https://react.dev
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Router Docs**: https://reactrouter.com

---

## 🎉 You're Ready!

Once you've customized:

1. Test everything locally: `npm run dev`
2. Build for production: `npm run build`
3. Deploy to your chosen platform
4. Share your beautiful new website!

---

## 💡 Pro Tips

- Use high-quality images (helps with SEO)
- Keep descriptions under 2 lines in cards
- Add real testimonials to About section
- Update prices/info monthly
- Add Google Analytics for insights

---

**Need more help?** Check comments in source code files - each component has inline documentation.

Happy building! 🚀
