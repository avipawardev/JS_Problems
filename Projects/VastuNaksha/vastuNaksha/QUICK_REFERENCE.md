# VastuNaksha - Quick Reference Card

## 🚀 Get Started

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## 📁 Key Files to Edit

| Task                   | File                          | Line               |
| ---------------------- | ----------------------------- | ------------------ |
| Change company name    | `src/components/Navbar.jsx`   | 13                 |
| Change logo            | `src/components/Navbar.jsx`   | 17                 |
| Change WhatsApp number | `src/pages/DesignDetails.jsx` | 46                 |
| Add/edit designs       | `src/data/designsData.js`     | All                |
| Change hero image      | `src/pages/Home.jsx`          | 62                 |
| Update contact info    | `src/pages/Home.jsx`          | 220+               |
| Change colors          | `src/**/*.jsx`                | Search: `bg-black` |

## 🎨 Quick Customizations

### Change WhatsApp Number

```javascript
// src/pages/DesignDetails.jsx - Line 46
const phoneNumber = "919876543210"; // Your number here
```

### Add New Design

```javascript
// src/data/designsData.js
{
  id: 13,
  category: "House Designs",
  title: "Your Design Name",
  image: "https://...",
  size: "30×60",
  description: "Description",
  highlights: {
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    parking: 1
  }
}
```

### Change Company Info

```javascript
// src/pages/Home.jsx

// Line 80: Hero heading
<h1>Your Company Headline</h1>

// Line 220: Company name in About
<h2>About Your Company</h2>

// Line 250: Contact email
<p>your@email.com</p>

// Line 260: Phone number
<p>+91 YOUR_PHONE</p>
```

### Update Hero Image

```javascript
// src/pages/Home.jsx - Line 62
src = "https://your-image-url.jpg";
```

## 🔑 Key Components

| Component     | Purpose                      | Location                        |
| ------------- | ---------------------------- | ------------------------------- |
| Navbar        | Top navigation (sticky)      | `src/components/Navbar.jsx`     |
| HeroForm      | Enquiry form (glassmorphism) | `src/components/HeroForm.jsx`   |
| DesignCard    | Design card (reusable)       | `src/components/DesignCard.jsx` |
| Home          | Landing page (all sections)  | `src/pages/Home.jsx`            |
| DesignDetails | Design detail + carousel     | `src/pages/DesignDetails.jsx`   |

## 📊 Data Structure

### Design Object

```javascript
{
  id: 1,                              // Unique ID
  category: "House Designs",          // Category for filtering
  title: "Modern Minimalist Home",    // Design name
  image: "https://...",               // Image URL
  size: "30×60",                      // Plot dimensions
  description: "...",                 // Full description
  highlights: {                       // Key features
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    parking: 1,
    area: "1500 sq.ft"
  }
}
```

## 🎯 Common Tasks

### Task 1: Change Logo

**File**: `src/components/Navbar.jsx` (Line 17-20)

**Option A - Emoji**:

```javascript
<span className="text-white font-bold text-lg">🏠</span>
```

**Option B - Image**:

```javascript
<img src="/logo.png" alt="Logo" className="w-8 h-8" />
```

### Task 2: Update Phone Number

**File**: `src/pages/DesignDetails.jsx` (Line 46)

```javascript
const phoneNumber = "919876543210"; // Change this
```

**Format**: Country code + phone (no +)

- India: 91 + phone
- USA: 1 + phone
- UK: 44 + phone

### Task 3: Add New Category

**Files to edit**:

1. `src/pages/Home.jsx` (Line 42):

```javascript
const categories = ['All', 'Your New Category', ...];
```

2. `src/data/designsData.js`:
   Add designs with `category: "Your New Category"`

### Task 4: Change Theme Color

Search & replace in all `.jsx` files:

- `bg-black` → `bg-blue-600`
- `text-black` → `text-blue-900`
- `border-black` → `border-blue-600`

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub first
# Then on vercel.com: Click "Import Project"
# Select your GitHub repo → Deploy
```

### Netlify

```bash
npm run build
# Drag 'dist' folder to netlify.com
```

### GitHub Pages

```bash
# Update vite.config.js: base: '/repo-name/'
npm run build
# Push to GitHub, enable Pages in settings
```

## 🧪 Testing

### Test Locally

```bash
npm run dev
# http://localhost:5173
```

### Test Form

1. Fill enquiry form
2. Navigate to design
3. Click WhatsApp button
4. Message should pre-fill

### Test WhatsApp Link

```
https://wa.me/919876543210?text=Hello
```

### Clear Cache

```bash
# Browser: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
# Or: npm run build && npm run dev
```

## 📦 Dependencies

```json
{
  "react": "^19.2.0", // UI Framework
  "react-dom": "^19.2.0", // React DOM
  "react-router-dom": "^x.x.x", // Routing
  "tailwindcss": "^4.1.17", // Styling
  "@tailwindcss/vite": "^4.1.17" // TailwindCSS Vite plugin
}
```

## 🎨 Color Palette

```css
Primary: #000000 (Black)
Secondary: #FFFFFF (White)
Neutral: #F3F4F6 to #111827 (Gray scale)
Success: #10B981 (Green - WhatsApp)
Accent: Use black for CTAs
```

## 🔧 Configuration Files

| File                 | Purpose                |
| -------------------- | ---------------------- |
| `vite.config.js`     | Vite build config      |
| `package.json`       | Dependencies & scripts |
| `eslint.config.js`   | Linting rules          |
| `tailwind.config.js` | Auto-generated         |

## 📱 Responsive Breakpoints

```
Mobile: 320px - 640px (sm)
Tablet: 640px - 768px (md)
Desktop: 768px - 1024px (lg)
Large: 1024px+ (xl)
```

TailwindCSS Syntax:

```html
<!-- Mobile first -->
<div class="block md:hidden">Mobile Only</div>
<div class="hidden md:block">Desktop Only</div>
<div class="text-sm md:text-lg lg:text-xl">Responsive Text</div>
```

## 🎬 Animations

```css
/* In App.css */
.animate-fade-in {
  /* 0.6s ease-out */
}
.animate-fade-in-delay {
  /* 0.6s with 0.2s delay */
}
.animate-fade-in-delay-2 {
  /* 0.6s with 0.4s delay */
}
```

## 📚 Documentation Files

- **README.md** - Full project documentation
- **CUSTOMIZATION_GUIDE.md** - How to customize
- **FORM_WHATSAPP_GUIDE.md** - Form & WhatsApp details
- **DEVELOPER_GUIDE.md** - Component architecture
- **QUICK_REFERENCE.md** - This file!

## ❓ FAQ

**Q: How do I add more designs?**
A: Edit `src/data/designsData.js` and add new objects to the array.

**Q: How do I change WhatsApp number?**
A: Edit `src/pages/DesignDetails.jsx` line 46.

**Q: Can I use this without backend?**
A: Yes! Everything is client-side. Forms don't send emails by default (can add with EmailJS).

**Q: How do I deploy?**
A: Build with `npm run build`, then push `dist/` folder to Vercel, Netlify, or GitHub Pages.

**Q: How do I change colors?**
A: Search & replace `bg-black` → `bg-your-color` in all files.

**Q: Can I add more sections?**
A: Yes! Copy a section in `Home.jsx` and customize it.

**Q: How do I add a blog?**
A: Create `src/pages/Blog.jsx`, add route in `App.jsx`, add nav item in `Navbar.jsx`.

## 💡 Pro Tips

✓ Use Unsplash for free high-quality images
✓ Keep designs under 2 lines in cards
✓ Test on mobile before deploying
✓ Update WhatsApp number before going live
✓ Use real design images for better conversions
✓ Add testimonials to About section
✓ Keep hero image file small (optimize with TinyPNG)

## 🚨 Before Going Live

- [ ] Update company name
- [ ] Update WhatsApp number
- [ ] Update contact email
- [ ] Add real design images
- [ ] Update hero background
- [ ] Test form submission
- [ ] Test WhatsApp links
- [ ] Clear browser cache
- [ ] Test on mobile
- [ ] Deploy to production

---

**Still need help?** Check the full documentation:

- README.md - Overview & features
- CUSTOMIZATION_GUIDE.md - How to customize
- FORM_WHATSAPP_GUIDE.md - Form & WhatsApp integration
- DEVELOPER_GUIDE.md - Component architecture
