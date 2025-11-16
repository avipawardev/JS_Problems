# 🚀 Deployment Guide for VastuNaksha

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   npm run deploy:vercel
   ```

3. **Or manually:**
   ```bash
   vercel
   ```

### Option 2: Netlify

1. **Install Netlify CLI:**

   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**

   ```bash
   npm run deploy:netlify
   ```

3. **Or manually:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. **Update vite.config.js:**

   ```javascript
   export default defineConfig({
     base: "/your-repo-name/",
     plugins: [react(), tailwindcss()],
   });
   ```

2. **Deploy using GitHub Actions** or manually upload the `dist` folder.

## Pre-deployment Checklist

- [ ] Update WhatsApp number in `src/pages/DesignDetails.jsx`
- [ ] Update contact email in `src/pages/Home.jsx`
- [ ] Update company information in footer
- [ ] Replace placeholder images with actual design images
- [ ] Update meta tags in `index.html` with your domain
- [ ] Test all links and forms
- [ ] Run `npm run build` successfully
- [ ] Test the built version with `npm run preview`

## Environment Variables (Optional)

If you need to configure environment-specific settings:

1. Create `.env` files:

   - `.env.local` (development)
   - `.env.production` (production)

2. Add variables like:

   ```
   VITE_WHATSAPP_NUMBER=919876543210
   VITE_COMPANY_EMAIL=contact@yourcompany.com
   ```

3. Access in code:
   ```javascript
   const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
   ```

## Performance Optimization

The app is already optimized with:

- ✅ Code splitting via React Router
- ✅ Optimized images with proper sizing
- ✅ Efficient CSS with TailwindCSS
- ✅ Minimal bundle size
- ✅ Vite's fast build process

## Domain Setup

### Custom Domain on Vercel:

1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add your custom domain

### Custom Domain on Netlify:

1. Go to Netlify dashboard
2. Site Settings → Domain Management
3. Add custom domain

## Post-deployment

1. **Update DNS records** if using custom domain
2. **Test all functionality** on the live site
3. **Set up analytics** (Google Analytics, etc.)
4. **Configure monitoring** if needed
5. **Set up backup** of the `dist` folder

## Troubleshooting

### SPA Routing Issues:

- Ensure `_redirects` (Netlify) or `vercel.json` (Vercel) is in the `public` folder
- For GitHub Pages, ensure `base` is set in `vite.config.js`

### Build Issues:

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for any console errors during build
- Ensure all dependencies are compatible

### Performance Issues:

- Check image sizes and optimize large images
- Consider lazy loading for images
- Monitor bundle size with `npm run build`

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Test locally with `npm run preview`
4. Check deployment platform logs

---

🎉 **Your VastuNaksha website is now ready for production!**
