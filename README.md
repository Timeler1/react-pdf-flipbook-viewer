

# React PDF Flipbook Viewer

A customizable React component to render PDF documents in a flipbook-style viewer — perfect for brochures, magazines, and interactive documents.
## Features

- **Flipbook Navigation**: Navigate through the PDF pages using flipbook-style animations.
- **Zoom and Pan**: Zoom in and out of the pages and pan around for better viewing.
- **Fullscreen Mode**: Toggle fullscreen mode for an immersive reading experience.
- **Keyboard Shortcuts**: Use keyboard arrows to navigate through the pages.
- **Responsive Design**: Optimized for various screen sizes.

## Installation
Install using npm
```bash
npm install react-pdf-flipbook-viewer
```
or with yarn
```bash
yarn add react-pdf-flipbook-viewer
```
## Tailwind Setup
This Library requires Tailwindcss. Add the following to your tailwind.config.js :
```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-pdf-flipbook-viewer/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
## Usage
This is a basic Example using nextjs:
```tsx
'use client';
import {FlipbookViewer} from 'react-pdf-flipbook-viewer'
import React from 'react'

const Page = () => {
  return (
    <div className="block">
      <FlipbookViewer pdfUrl='/demo.pdf' />
    </div>
  )
}

export default Page
```
## Components

### FlipbookViewer

| Prop          | Type      | Description                                      |
|---------------|-----------|--------------------------------------------------|
| `pdfUrl`      | `string`  | URL of the PDF document to be displayed.         |
| `shareUrl`    | `string`  | URL to be used for sharing the document.         |
| `className`   | `string`  | Additional CSS classes for styling.              |
| `disableShare`| `boolean` | Flag to disable the share button.                |

## Local Development
You can run the following to setup a development environment:

```bash
git clone https://github.com/Timeler1/react-pdf-flipbook-viewer
cd react-pdf-flipbook-viewer
npm install
npm run build
```
You can use ``yalc`` to test changes locally in another project.

## Thanks

Special thanks to the creator of the original project, [mohitkumawat310](https://github.com/mohitkumawat310/react-pdf-flipbook-viewer).

Thanks also to the libraries used in this Project:

- [React](https://reactjs.org/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [react-pageflip](https://github.com/Nodlik/react-pageflip)
- [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- [screenfull](https://github.com/sindresorhus/screenfull.js)
- [tailwindcss](https://tailwindcss.com/)
- [class-variance-authority](https://github.com/joe-bell/class-variance-authority)
- [clsx](https://github.com/lukeed/clsx)
- [lucide-react](https://github.com/lucide-icons/lucide)
- [react-share](https://github.com/nygardk/react-share)
