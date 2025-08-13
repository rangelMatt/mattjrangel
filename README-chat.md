# AI Chat Assistant for mattjrangel.com

A sophisticated AI assistant integrated into the Project Dashboard that provides contextual help, BJJ coaching with PM analogies, and recruiter-friendly summaries.

## 🚀 Features

- **Multi-Mode Assistant**: Page-specific help, BJJ coaching, PM consulting, and recruiter summaries
- **Contextual Awareness**: Knows current page content and user text selections
- **Streaming Responses**: Real-time AI responses with typing indicators
- **Persistent Chat**: Messages saved per-page in localStorage
- **Mobile Optimized**: Responsive design with touch-friendly interface
- **Accessibility**: Full keyboard navigation, screen reader support, focus management

## 🛠️ Setup

### 1. Environment Variables

Create `.env.local` in your project root:

```bash
# Required: Your OpenAI API key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Specify model (defaults to gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini
```

### 2. Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the same variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `OPENAI_MODEL`: (optional) Model name
4. Redeploy your project

### 3. Dependencies

The following packages are automatically installed:

```bash
npm install openai zustand
```

## 🎯 Usage

### For Users

1. **Access**: Click the floating chat button (bottom-right) on any Project Dashboard page
2. **Select Mode**: Choose from 4 specialized modes:

   - 📄 **Page**: Ask about current page content
   - 🥋 **BJJ Coach**: Get BJJ advice with PM analogies
   - 📊 **PM Consultant**: PM guidance with BJJ analogies
   - 💼 **Recruiter**: Professional background summaries

3. **Text Selection**: Select text on the page to include context in your question
4. **Keyboard Shortcuts**:
   - `Enter`: Send message
   - `Shift+Enter`: New line
   - `Escape`: Close chat

### For Developers

#### Adding Chat to New Pages

```jsx
import ProjectDashboardLayout from "../../components/assistant/ProjectDashboardLayout";

const MyPage = () => (
  <ProjectDashboardLayout
    pageTitle="My Page Title"
    pageDescription="Page description for AI context"
  >
    {/* Your page content */}
  </ProjectDashboardLayout>
);
```

#### Customizing System Prompts

Edit `src/pages/api/chat.js` to modify the AI behavior:

```javascript
function buildSystemPrompt(mode, pageMeta) {
  // Customize prompts for each mode
  switch (mode) {
    case "page":
      return `Your custom page-specific prompt...`;
    // ... other modes
  }
}
```

## 🏗️ Architecture

### Components

- **`ChatWidget.js`**: Main UI component with floating button and slide-over panel
- **`useChatStore.js`**: Zustand store for state management
- **`ProjectDashboardLayout.js`**: Wrapper component for easy integration

### API Route

- **`/api/chat`**: Handles OpenAI API calls with streaming responses
- **Rate Limiting**: 10 requests per 5 minutes per IP
- **Error Handling**: Graceful fallbacks for API failures

### State Management

```javascript
// Key state properties
{
  isOpen: boolean,           // Chat panel visibility
  mode: string,             // Current mode (page/bjj/pm/recruiter)
  messages: array,          // Chat history
  isStreaming: boolean,     // Response streaming status
  error: string|null,       // Error messages
  pageMeta: object          // Current page context
}
```

## 🎨 Styling

### Design System

- **Colors**: Uses existing Tailwind theme (`primary`, `dark`, `light`)
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design with safe area insets
- **Dark Mode**: Full dark mode support

### Customization

Modify colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
        // ... other colors
      },
    },
  },
};
```

## 🔧 Configuration

### Rate Limiting

Adjust limits in `src/pages/api/chat.js`:

```javascript
const RATE_LIMIT_REQUESTS = 10; // Requests per window
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
```

### Message Persistence

Messages are automatically saved per-page in localStorage:

```javascript
// Key format: chat:/project-dashboard/blog/intro-to-bjj-project-management
localStorage.setItem(`chat:${pathname}`, JSON.stringify(messages));
```

### Model Configuration

Set default model in environment or API:

```javascript
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
```

## 🧪 Testing

### Local Development

1. Start development server: `npm run dev`
2. Navigate to any Project Dashboard page
3. Click chat button and test all modes
4. Verify streaming responses and error handling

### Production Testing

1. Deploy to Vercel with environment variables
2. Test on mobile devices
3. Verify rate limiting works
4. Check accessibility with screen readers

## 🐛 Troubleshooting

### Common Issues

**"API configuration error"**

- Check `OPENAI_API_KEY` is set correctly
- Verify API key has sufficient credits

**"Rate limit exceeded"**

- Wait 5 minutes or increase limits in code
- Check if multiple users are hitting the same IP

**Chat not appearing**

- Ensure `ProjectDashboardLayout` is imported and used
- Check browser console for JavaScript errors

**Streaming not working**

- Verify OpenAI API supports streaming
- Check network connectivity

### Debug Mode

Add debug logging to `src/pages/api/chat.js`:

```javascript
console.log("Chat request:", { mode, pageMeta, messageCount: messages.length });
```

## 📈 Performance

### Optimizations

- **Streaming**: Real-time responses reduce perceived latency
- **Caching**: Messages persisted in localStorage
- **Rate Limiting**: Prevents API abuse
- **Lazy Loading**: Chat components load only when needed

### Monitoring

Track usage in Vercel Analytics or add custom metrics:

```javascript
// Add to API route
console.log(`Chat request from ${clientIP} in mode ${mode}`);
```

## 🔒 Security

- **API Keys**: Never exposed to client-side code
- **Rate Limiting**: Prevents abuse and controls costs
- **Input Validation**: Sanitized user inputs
- **Error Handling**: No sensitive data in error messages

## 🎉 GIF-Worthy Features

1. **Text Selection Context**: Select any text on the page and ask "explain this" - the AI will reference your selection!
2. **Mode Switching**: Seamlessly switch between BJJ coach and PM consultant modes
3. **Streaming Responses**: Watch the AI type responses in real-time
4. **Mobile Gestures**: Smooth slide-over panel on mobile devices
5. **Recruiter Mode**: Get professional summaries with internal links to your site

---

**Pro Tip**: Try asking the recruiter mode "Tell me about Matt's technical background" to see how it surfaces relevant internal links and quantified achievements!
