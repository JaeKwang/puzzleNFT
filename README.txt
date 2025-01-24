# Vite & React 설치
npm create vite@latest [NAME]
cd [NAME]
npm install

# Tailwind 설치
npm install tailwindcss @tailwindcss/vite

# vite.config.js 파일 수정
/////////////////////
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
/////////////////////

# index.css 파일 수정
@import "tailwindcss";

# remix localhost 연결
remixd -s . -u https://remix.ethereum.org
