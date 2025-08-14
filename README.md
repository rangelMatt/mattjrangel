# Next.Js Portfolio

## Stunning Portfolio Website with Nextjs, Tailwind CSS and Framer-motion🌟

### Resources Used in This Project

- Profile image in the home page created by using https://www.midjourney.com/ tool.
- Fonts from https://fonts.google.com/ <br />
- Icons from https://iconify.design/ <br />
- LightBulb Svg from https://lukaszadam.com/illustrations <br />

### External Libraries used in this project:

- [framer-motion](https://www.framer.com/motion/) <br />
- [Tailwind css](https://tailwindcss.com/) <br />

### AI Chat Feature

The AI chat functionality is gated behind a feature flag for safe deployment:

- **Feature Flag**: `NEXT_PUBLIC_AI_CHAT_ENABLED`
- **Default**: `false` (disabled)
- **To Enable**: Set `NEXT_PUBLIC_AI_CHAT_ENABLED=true` in your environment variables

#### Vercel Deployment

To enable AI chat on Vercel:
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add `NEXT_PUBLIC_AI_CHAT_ENABLED` with value `true`
4. Redeploy your project

#### Local Development

Copy `.env.example` to `.env.local` and modify as needed:
```bash
cp .env.example .env.local
```

# Trigger deployment
