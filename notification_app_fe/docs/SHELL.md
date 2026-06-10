# Campus Notifications - Application Shell

## Overview

The application shell is a clean, modern student portal interface that feels professional and approachable. It avoids the common pitfalls of admin dashboards and generated templates.

## Design Philosophy

- **Student-First**: Designed for students, not administrators
- **Simple & Modern**: Clean typography, realistic spacing
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Minimal**: No unnecessary UI elements or abstractions

## Components

### AppHeader
Located at `src/components/layout/AppHeader.tsx`

The sticky navigation bar featuring:
- **Logo & Title**: Campus Notifications with notification icon
- **Navigation Tabs**: "All Notifications" and "Priority Inbox"
- **Active States**: Underline indicator for current page
- **Mobile Drawer**: Hidden hamburger menu that slides down on small screens
- **Accessible**: Proper ARIA labels and semantic HTML

**Key Features**:
- Sticky positioning for always-visible navigation
- Desktop horizontal layout with underline indicators
- Mobile drawer (slides from top)
- Active page highlight with smooth transitions
- Icon integration using Material UI icons

### PageContainer
Located at `src/components/layout/PageContainer.tsx`

A reusable wrapper for page content with:
- **Page Title**: Large, prominent heading (h2)
- **Description**: Optional subtitle/context
- **Max Width**: Constrained to `md` (960px) for readability
- **Padding**: Responsive vertical spacing (3-5rem depending on screen)
- **Background**: Consistent off-white background

## Layout Structure

```
<html>
  <body>
    <AppProvider>           {/* Theme + MUI Setup */}
      <AppHeader />         {/* Sticky nav bar */}
      <main>                {/* Page content via routing */}
        <PageContainer>
          {/* Page-specific content */}
        </PageContainer>
      </main>
    </AppProvider>
  </body>
</html>
```

## Routing

### `/` (All Notifications)
**Path**: `src/app/page.tsx`

Shows all campus notifications with:
- Descriptive page title and subheading
- Empty state with bell icon and helpful message
- Placeholder skeleton loaders for mock data
- Refresh button for user action

### `/priority` (Priority Inbox)
**Path**: `src/app/priority/page.tsx`

Shows important/urgent notifications with:
- Descriptive page title and subheading
- Empty state with star icon and helpful message
- "View All" button linking back to all notifications

## Design Decisions

### Typography
- **Responsive**: Font sizes scale with breakpoints
- **Hierarchy**: Clear h1-h6 structure with appropriate weights
- **Spacing**: Consistent letter-spacing and line-height
- **Family**: System fonts (Segoe UI, Roboto) for better performance

### Colors
- **Primary**: `#1565c0` (professional blue for educational context)
- **Secondary**: `#f57c00` (attention-grabbing orange for accents)
- **Background**: `#f5f5f5` (soft gray, not pure white)
- **Text**: `#212121` primary, `#757575` secondary

### Spacing
- **AppBar Height**: 64px (standard Material Design)
- **Container Padding**: 2-4rem responsive (xs-md)
- **Page Title Bottom**: 1rem
- **Section Gap**: 2-3rem responsive

### Components Styling
- **Buttons**: No text transform, border-radius 6px
- **Cards**: Subtle 1px border, soft shadow
- **Chips**: Rounded (20px), consistent style
- **Icons**: Scaled appropriately (1-4rem depending on context)

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy, native elements
2. **ARIA Labels**: Meaningful labels on interactive elements
3. **Keyboard Navigation**: Full keyboard support via Material UI
4. **Color Contrast**: WCAG AA compliant text/background ratios
5. **Mobile Touch**: Adequate button/tap target sizes (48px minimum)
6. **Screen Readers**: Descriptive button text, skip links ready

## Mobile-Friendly Features

- **Responsive Padding**: 1rem on mobile, 2-4rem on desktop
- **Font Scaling**: Automatically scales with breakpoints
- **Touch Targets**: Buttons/links min 48px (Material Design)
- **Drawer Navigation**: Slide-down menu instead of horizontal on mobile
- **Single Column**: Content stacks vertically on small screens
- **No Horizontal Scroll**: All content fits within viewport

## Theme Configuration

Located in `src/app/providers.tsx`:

```typescript
const theme = createTheme({
  palette: { /* colors */ },
  typography: { /* fonts and sizing */ },
  components: { /* component overrides */ }
});
```

Key customizations:
- Responsive typography with `responsiveFontSizes()`
- AppBar styling (white background, subtle border)
- Card styling (borders instead of shadows)
- Button styling (no text-transform)

## File Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with AppHeader
│   ├── providers.tsx     # Theme configuration
│   ├── page.tsx          # / - All Notifications
│   └── priority/
│       └── page.tsx      # /priority - Priority Inbox
└── components/
    └── layout/
        ├── AppHeader.tsx     # Navigation component
        ├── PageContainer.tsx # Page wrapper
        └── index.ts          # Exports
```

## Getting Started

### Run Dev Server
```bash
npm run dev
```
Opens at http://localhost:3000

### Testing Navigation
1. Home: http://localhost:3000/
2. Priority: http://localhost:3000/priority
3. Mobile: Use DevTools to toggle device toolbar
4. Keyboard: Tab through, Enter/Space to activate buttons

### Adding New Pages

1. Create directory: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Wrap with `<PageContainer>`
4. Update nav in `AppHeader.tsx` if needed

```typescript
export default function NewPage() {
  return (
    <PageContainer
      title="Page Title"
      description="Optional description"
    >
      {/* Your content here */}
    </PageContainer>
  );
}
```

## Why This Design Works

1. **Real Portal Feel**: Matches actual university portals (not generic template)
2. **Student Intuition**: Navigation and layout match familiar patterns
3. **Clean, Professional**: Suitable for academic environment
4. **Minimal Distraction**: Focus on content, not UI chrome
5. **Future-Ready**: Easy to add notification cards, filters, etc.

## Next Steps

The shell is ready for:
1. Notification card components
2. Real API integration
3. Filtering/sorting UI
4. User preferences/settings
5. Real-time updates
