# Production Deployment Checklist

## Vercel Configuration

### Environment Settings

1. **Production Branch**: Set to `main`
   - Vercel → Settings → Git → Production Branch = `main`

### Build & Development Settings

1. **Node.js Version**: Set to 22.x
   - Vercel → Settings → Build & Development → Node.js Version = `22.x`

### Environment Variables

1. **AI Chat Feature Flag** (when ready to enable):
   - Add `NEXT_PUBLIC_AI_CHAT_ENABLED=true`
   - Vercel → Settings → Environment Variables → Add Variable

## Optional: Ignored Build Step

To prevent non-main branch deployments, add this to Vercel → Settings → Build & Development → Ignored Build Step:

```bash
if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "Skipping non-main branch build: $VERCEL_GIT_COMMIT_REF"
  exit 0
fi
```

## Local Development

### Node Version

- Ensure you're using Node 22: `nvm use` (uses .nvmrc)
- Or manually: `nvm use 22`

### Environment Setup

1. Copy environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Modify `.env.local` as needed for local development

## Build Verification

### Local Build Test

```bash
npm run build
```

### Expected Output

- ✅ Compiled successfully
- ✅ No ESLint errors
- ✅ All pages generated
- ✅ Static optimization complete

## Deployment Verification

### Pre-deployment Checklist

- [ ] All tests pass locally
- [ ] Build succeeds locally
- [ ] No console errors in development
- [ ] All pages load correctly
- [ ] Responsive design works on mobile/desktop

### Post-deployment Verification

- [ ] Site loads at production URL
- [ ] All pages accessible
- [ ] Images and assets load correctly
- [ ] Dark/light mode toggle works
- [ ] Navigation functions properly
- [ ] Contact forms work (if any)
- [ ] Performance is acceptable (Lighthouse score)

## Troubleshooting

### Common Issues

1. **Build fails on Vercel**: Check Node.js version is set to 22.x
2. **Environment variables not working**: Ensure they're set for Production environment
3. **Cache issues**: Clear Vercel cache or redeploy
4. **404 errors**: Check that all pages are properly exported

### Performance Optimization

- Images are optimized and in correct format
- CSS is minified and optimized
- JavaScript bundles are reasonable size
- No unused dependencies in production build
