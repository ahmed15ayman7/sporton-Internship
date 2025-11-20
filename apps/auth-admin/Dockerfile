# -----------------------
# Stage 1: deps (install dependencies)
# -----------------------
    FROM node:20-alpine AS deps

    RUN apk add --no-cache git libc6-compat
    WORKDIR /app
    
    # install pnpm
    RUN npm install -g pnpm@latest
    
    # copy root manifests
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tailwind.config.js ./ 
    
    # copy full source of packages + apps/auth-admin
    COPY packages ./packages
    COPY apps/auth-admin ./apps/auth-admin
    COPY apps/home/store ./apps/home/store
    
    # install all deps (dev needed for build)
    RUN pnpm install --frozen-lockfile
    
    # -----------------------
    # Stage 2: builder (build Next.js)
    # -----------------------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    RUN npm install -g pnpm@latest
    
    # copy everything from deps stage (node_modules + source code)
    COPY --from=deps /app ./
    
      # --- START MODIFICATION ---
  # سنمرر NODE_ENV كـ build argument للتأكد من أن Next.js يبني الكود بشكل صحيح
  # (production build أو development build)
  ARG NODE_ENV=production
  ENV NODE_ENV=${NODE_ENV}
  # --- END MODIFICATION ---
  
    
    # build the auth-admin app
    RUN pnpm --filter auth-admin build
    
    # -----------------------
    # Stage 3: production (run standalone output)
    # -----------------------
    FROM node:20-alpine AS production
    
    RUN apk add --no-cache dumb-init
    WORKDIR /app
    
    # create non-root user
    RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
    
    # ✅ ثبت pnpm هنا
    RUN npm install -g pnpm@latest

    # copy only standalone output
    COPY --from=builder /app/apps/auth-admin/.next/standalone .
    COPY --from=builder /app/apps/auth-admin/.next/static ./apps/auth-admin/.next/static
    COPY --from=builder /app/apps/auth-admin/public ./apps/auth-admin/public
    COPY --from=builder /app/apps/home/store ./apps/home/store
    
    # --- START MODIFICATION ---
  # حذف القيم الثابتة. هذه القيم ستأتي من الـ script الآن.
  # ENV NODE_ENV=production    <- DELETE
  # ENV PORT=4004              <- DELETE
  
  # سنستخدم ARG للحصول على قيمة المنفذ، ثم نستخدمها في EXPOSE
  ARG PORT=4004
  ENV HOST=0.0.0.0
  # --- END MODIFICATION ---  
    
    USER nodejs
    EXPOSE ${PORT}
    
    HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
      CMD wget -qO- http://localhost:${PORT}/ || exit 1
    
    CMD ["pnpm", "au-ad:s"]
    