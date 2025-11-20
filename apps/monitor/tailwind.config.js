/** @type {import('tailwindcss').Config} */
module.exports = {
  //darkMode: ["class"],
  
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
//   safelist: [
//     // Custom background blur
//     'bg-blur-[34px]',
//     "bg-gradient-to-r","bg-gradient-to-br",
//     "bg-gradient-to-tl","bg-gradient-to-tr",
//     "bg-gradient-to-bl","bg-gradient-to-br",
//     "bg-gradient-to-tl","bg-gradient-to-tr",
//     "bg-gradient-to-b","bg-gradient-to-t",
//     "bg-gradient-to-l","bg-gradient-to-r",
//     "bg-gradient-to-tl","bg-gradient-to-tr",
//     "bg-gradient-to-bl","bg-gradient-to-br",
//     "bg-gradient-to-tl","bg-gradient-to-tr",
//     "bg-gradient-to-b","bg-gradient-to-t",
//     "bg-gradient-to-l","bg-gradient-to-r",
//     "bg-opacity-0","bg-opacity-10","bg-opacity-20","bg-opacity-30","bg-opacity-40","bg-opacity-50","bg-opacity-60","bg-opacity-70","bg-opacity-80","bg-opacity-90","bg-opacity-100",

    
//     // Spacing
//     'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'p-12', 'p-16', 'p-20', 'p-24', 'p-32', 'p-40', 'p-48', 'p-56', 'p-64', 'p-px',
//     'px-0', 'px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'px-6', 'px-8', 'px-10', 'px-12', 'px-16', 'px-20', 'px-24', 'px-32', 'px-40', 'px-48', 'px-56', 'px-64', 'px-px',
//     'py-0', 'py-1', 'py-2', 'py-3', 'py-4', 'py-5', 'py-6', 'py-8', 'py-10', 'py-12', 'py-16', 'py-20', 'py-24', 'py-32', 'py-40', 'py-48', 'py-56', 'py-64', 'py-px',
//     'pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6', 'pt-8', 'pt-10', 'pt-12', 'pt-16', 'pt-20', 'pt-24', 'pt-32', 'pt-40', 'pt-48', 'pt-56', 'pt-64', 'pt-px',
//     'pr-0', 'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5', 'pr-6', 'pr-8', 'pr-10', 'pr-12', 'pr-16', 'pr-20', 'pr-24', 'pr-32', 'pr-40', 'pr-48', 'pr-56', 'pr-64', 'pr-px',
//     'pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'pb-6', 'pb-8', 'pb-10', 'pb-12', 'pb-16', 'pb-20', 'pb-24', 'pb-32', 'pb-40', 'pb-48', 'pb-56', 'pb-64', 'pb-px',
//     'pl-0', 'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5', 'pl-6', 'pl-8', 'pl-10', 'pl-12', 'pl-16', 'pl-20', 'pl-24', 'pl-32', 'pl-40', 'pl-48', 'pl-56', 'pl-64', 'pl-px',
//     'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-8', 'm-10', 'm-12', 'm-16', 'm-20', 'm-24', 'm-32', 'm-40', 'm-48', 'm-56', 'm-64', 'm-auto', 'm-px',
//     'mx-0', 'mx-1', 'mx-2', 'mx-3', 'mx-4', 'mx-5', 'mx-6', 'mx-8', 'mx-10', 'mx-12', 'mx-16', 'mx-20', 'mx-24', 'mx-32', 'mx-40', 'mx-48', 'mx-56', 'mx-64', 'mx-auto', 'mx-px',
//     'my-0', 'my-1', 'my-2', 'my-3', 'my-4', 'my-5', 'my-6', 'my-8', 'my-10', 'my-12', 'my-16', 'my-20', 'my-24', 'my-32', 'my-40', 'my-48', 'my-56', 'my-64', 'my-auto', 'my-px',
//     'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-6', 'mt-8', 'mt-10', 'mt-12', 'mt-16', 'mt-20', 'mt-24', 'mt-32', 'mt-40', 'mt-48', 'mt-56', 'mt-64', 'mt-auto', 'mt-px',
//     'mr-0', 'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5', 'mr-6', 'mr-8', 'mr-10', 'mr-12', 'mr-16', 'mr-20', 'mr-24', 'mr-32', 'mr-40', 'mr-48', 'mr-56', 'mr-64', 'mr-auto', 'mr-px',
//     'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-6', 'mb-8', 'mb-10', 'mb-12', 'mb-16', 'mb-20', 'mb-24', 'mb-32', 'mb-40', 'mb-48', 'mb-56', 'mb-64', 'mb-auto', 'mb-px',
//     'ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5', 'ml-6', 'ml-8', 'ml-10', 'ml-12', 'ml-16', 'ml-20', 'ml-24', 'ml-32', 'ml-40', 'ml-48', 'ml-56', 'ml-64', 'ml-auto', 'ml-px',
    
//     // Width and Height
//     'w-0', 'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-8', 'w-10', 'w-12', 'w-16', 'w-20', 'w-24', 'w-32', 'w-40', 'w-48', 'w-56', 'w-64',"w-96", 'w-auto', 'w-full', 'w-screen', 'w-min', 'w-max',
//     'h-0', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-8', 'h-10', 'h-12', 'h-16', 'h-20', 'h-24', 'h-32', 'h-40', 'h-48', 'h-56', 'h-64',"h-92","h-96", 'h-auto', 'h-full', 'h-screen', 'h-min', 'h-max',
    
//     // Colors - Background
//     'bg-transparent', 'bg-current', 'bg-black', 'bg-white',
//     'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
//     'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900',
//     'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900',
//     'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900',
//     'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
//     'bg-teal-50', 'bg-teal-100', 'bg-teal-200', 'bg-teal-300', 'bg-teal-400', 'bg-teal-500', 'bg-teal-600', 'bg-teal-700', 'bg-teal-800', 'bg-teal-900',
//     'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
//     'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-800', 'bg-indigo-900',
//     'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
//     'bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900',
    
//     // Colors - Text
//     'text-transparent', 'text-current', 'text-black', 'text-white',
//     'text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
//     'text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900',
//     'text-orange-50', 'text-orange-100', 'text-orange-200', 'text-orange-300', 'text-orange-400', 'text-orange-500', 'text-orange-600', 'text-orange-700', 'text-orange-800', 'text-orange-900',
//     'text-yellow-50', 'text-yellow-100', 'text-yellow-200', 'text-yellow-300', 'text-yellow-400', 'text-yellow-500', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800', 'text-yellow-900',
//     'text-green-50', 'text-green-100', 'text-green-200', 'text-green-300', 'text-green-400', 'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900',
//     'text-teal-50', 'text-teal-100', 'text-teal-200', 'text-teal-300', 'text-teal-400', 'text-teal-500', 'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900',
//     'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
//     'text-indigo-50', 'text-indigo-100', 'text-indigo-200', 'text-indigo-300', 'text-indigo-400', 'text-indigo-500', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900',
//     'text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900',
//     'text-pink-50', 'text-pink-100', 'text-pink-200', 'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600', 'text-pink-700', 'text-pink-800', 'text-pink-900',
    
//     // Colors - Border
//     'border-transparent', 'border-current', 'border-black', 'border-white',
//     'border-gray-50', 'border-gray-100', 'border-gray-200', 'border-gray-300', 'border-gray-400', 'border-gray-500', 'border-gray-600', 'border-gray-700', 'border-gray-800', 'border-gray-900',
//     'border-red-50', 'border-red-100', 'border-red-200', 'border-red-300', 'border-red-400', 'border-red-500', 'border-red-600', 'border-red-700', 'border-red-800', 'border-red-900',
//     'border-orange-50', 'border-orange-100', 'border-orange-200', 'border-orange-300', 'border-orange-400', 'border-orange-500', 'border-orange-600', 'border-orange-700', 'border-orange-800', 'border-orange-900',
//     'border-yellow-50', 'border-yellow-100', 'border-yellow-200', 'border-yellow-300', 'border-yellow-400', 'border-yellow-500', 'border-yellow-600', 'border-yellow-700', 'border-yellow-800', 'border-yellow-900',
//     'border-green-50', 'border-green-100', 'border-green-200', 'border-green-300', 'border-green-400', 'border-green-500', 'border-green-600', 'border-green-700', 'border-green-800', 'border-green-900',
//     'border-teal-50', 'border-teal-100', 'border-teal-200', 'border-teal-300', 'border-teal-400', 'border-teal-500', 'border-teal-600', 'border-teal-700', 'border-teal-800', 'border-teal-900',
//     'border-blue-50', 'border-blue-100', 'border-blue-200', 'border-blue-300', 'border-blue-400', 'border-blue-500', 'border-blue-600', 'border-blue-700', 'border-blue-800', 'border-blue-900',
//     'border-indigo-50', 'border-indigo-100', 'border-indigo-200', 'border-indigo-300', 'border-indigo-400', 'border-indigo-500', 'border-indigo-600', 'border-indigo-700', 'border-indigo-800', 'border-indigo-900',
//     'border-purple-50', 'border-purple-100', 'border-purple-200', 'border-purple-300', 'border-purple-400', 'border-purple-500', 'border-purple-600', 'border-purple-700', 'border-purple-800', 'border-purple-900',
//     'border-pink-50', 'border-pink-100', 'border-pink-200', 'border-pink-300', 'border-pink-400', 'border-pink-500', 'border-pink-600', 'border-pink-700', 'border-pink-800', 'border-pink-900',
    
//     // Border Width
//     'border-0', 'border-2', 'border-4', 'border-8', 'border',
    
//     // Border Radius
//     'rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full',
//     'rounded-t-none', 'rounded-t-sm', 'rounded-t', 'rounded-t-md', 'rounded-t-lg', 'rounded-t-xl', 'rounded-t-2xl', 'rounded-t-3xl', 'rounded-t-full',
//     'rounded-r-none', 'rounded-r-sm', 'rounded-r', 'rounded-r-md', 'rounded-r-lg', 'rounded-r-xl', 'rounded-r-2xl', 'rounded-r-3xl', 'rounded-r-full',
//     'rounded-b-none', 'rounded-b-sm', 'rounded-b', 'rounded-b-md', 'rounded-b-lg', 'rounded-b-xl', 'rounded-b-2xl', 'rounded-b-3xl', 'rounded-b-full',
//     'rounded-l-none', 'rounded-l-sm', 'rounded-l', 'rounded-l-md', 'rounded-l-lg', 'rounded-l-xl', 'rounded-l-2xl', 'rounded-l-3xl', 'rounded-l-full',
//     'rounded-tl-none', 'rounded-tl-sm', 'rounded-tl', 'rounded-tl-md', 'rounded-tl-lg', 'rounded-tl-xl', 'rounded-tl-2xl', 'rounded-tl-3xl', 'rounded-tl-full',
//     'rounded-tr-none', 'rounded-tr-sm', 'rounded-tr', 'rounded-tr-md', 'rounded-tr-lg', 'rounded-tr-xl', 'rounded-tr-2xl', 'rounded-tr-3xl', 'rounded-tr-full',
//     'rounded-br-none', 'rounded-br-sm', 'rounded-br', 'rounded-br-md', 'rounded-br-lg', 'rounded-br-xl', 'rounded-br-2xl', 'rounded-br-3xl', 'rounded-br-full',
//     'rounded-bl-none', 'rounded-bl-sm', 'rounded-bl', 'rounded-bl-md', 'rounded-bl-lg', 'rounded-bl-xl', 'rounded-bl-2xl', 'rounded-bl-3xl', 'rounded-bl-full',
    
//     // Typography
//     'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl',
//     'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black',
//     'text-left', 'text-center', 'text-right', 'text-justify',
//     'italic', 'not-italic',
//     'uppercase', 'lowercase', 'capitalize', 'normal-case',
//     'underline', 'line-through', 'no-underline',
    
//     // Display
//     'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'hidden',
    
//     // Flexbox
//     'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse',
//     'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap',
//     'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch',
//     'justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly',
//     'content-start', 'content-end', 'content-center', 'content-between', 'content-around', 'content-evenly',
//     'flex-1', 'flex-auto', 'flex-initial', 'flex-none',
//     'flex-grow-0', 'flex-grow', 'flex-shrink-0', 'flex-shrink',
//     'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'duration-200',
//     'group', 'animate-in', 'fade-in-0', 'slide-in-from-left-1', 'slide-in-from-right-1', 'slide-in-from-top-1', 'slide-in-from-bottom-1', 'slide-in-from-left-2', 'slide-in-from-right-2', 'slide-in-from-top-2', 'slide-in-from-bottom-2', 'slide-in-from-left-3', 'slide-in-from-right-3', 'slide-in-from-top-3', 'slide-in-from-bottom-3', 'slide-in-from-left-4', 'slide-in-from-right-4', 'slide-in-from-top-4', 'slide-in-from-bottom-4', 'slide-in-from-left-5', 'slide-in-from-right-5', 'slide-in-from-top-5', 'slide-in-from-bottom-5', 'slide-in-from-left-6', 'slide-in-from-right-6', 'slide-in-from-top-6', 'slide-in-from-bottom-6', 'slide-in-from-left-7', 'slide-in-from-right-7', 'slide-in-from-top-7', 'slide-in-from-bottom-7', 'slide-in-from-left-8', 'slide-in-from-right-8', 'slide-in-from-top-8', 'slide-in-from-bottom-8', 'slide-in-from-left-9', 'slide-in-from-right-9', 'slide-in-from-top-9', 'slide-in-from-bottom-9', 'slide-in-from-left-10', 'slide-in-from-right-10', 'slide-in-from-top-10', 'slide-in-from-bottom-10',

// "max-w-[70%]", "max-w-[80%]", "max-w-[90%]", "max-w-[100%]",
//     "min-w-[70%]", "min-w-[80%]", "min-w-[90%]", "min-w-[100%]",
//     "w-[70%]", "w-[80%]", "w-[90%]", "w-[100%]",
//     "h-[70%]", "h-[80%]", "h-[90%]", "h-[100%]",
//     "max-h-[70%]", "max-h-[80%]", "max-h-[90%]", "max-h-[100%]",
//     "min-h-[70%]", "min-h-[80%]", "min-h-[90%]", "min-h-[100%]",
//     "h-[70%]", "h-[80%]", "h-[90%]", "h-[100%]",
    
//     // Grid
//     'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8', 'grid-cols-9', 'grid-cols-10', 'grid-cols-11', 'grid-cols-12', 'grid-cols-none',
//     "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4", "md:grid-cols-5", "md:grid-cols-6", "md:grid-cols-7", "md:grid-cols-8", "md:grid-cols-9", "md:grid-cols-10", "md:grid-cols-11", "md:grid-cols-12", "md:grid-cols-none",
//     "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4", "lg:grid-cols-5", "lg:grid-cols-6", "lg:grid-cols-7", "lg:grid-cols-8", "lg:grid-cols-9", "lg:grid-cols-10", "lg:grid-cols-11", "lg:grid-cols-12", "lg:grid-cols-none",
//     "xl:grid-cols-1", "xl:grid-cols-2", "xl:grid-cols-3", "xl:grid-cols-4", "xl:grid-cols-5", "xl:grid-cols-6", "xl:grid-cols-7", "xl:grid-cols-8", "xl:grid-cols-9", "xl:grid-cols-10", "xl:grid-cols-11", "xl:grid-cols-12", "xl:grid-cols-none",
//     "2xl:grid-cols-1", "2xl:grid-cols-2", "2xl:grid-cols-3", "2xl:grid-cols-4", "2xl:grid-cols-5", "2xl:grid-cols-6", "2xl:grid-cols-7", "2xl:grid-cols-8", "2xl:grid-cols-9", "2xl:grid-cols-10", "2xl:grid-cols-11", "2xl:grid-cols-12", "2xl:grid-cols-none",
//     "3xl:grid-cols-1", "3xl:grid-cols-2", "3xl:grid-cols-3", "3xl:grid-cols-4", "3xl:grid-cols-5", "3xl:grid-cols-6", "3xl:grid-cols-7", "3xl:grid-cols-8", "3xl:grid-cols-9", "3xl:grid-cols-10", "3xl:grid-cols-11", "3xl:grid-cols-12", "3xl:grid-cols-none",
//     "4xl:grid-cols-1", "4xl:grid-cols-2", "4xl:grid-cols-3", "4xl:grid-cols-4", "4xl:grid-cols-5", "4xl:grid-cols-6", "4xl:grid-cols-7", "4xl:grid-cols-8", "4xl:grid-cols-9", "4xl:grid-cols-10", "4xl:grid-cols-11", "4xl:grid-cols-12", "4xl:grid-cols-none",
//     "5xl:grid-cols-1", "5xl:grid-cols-2", "5xl:grid-cols-3", "5xl:grid-cols-4", "5xl:grid-cols-5", "5xl:grid-cols-6", "5xl:grid-cols-7", "5xl:grid-cols-8", "5xl:grid-cols-9", "5xl:grid-cols-10", "5xl:grid-cols-11", "5xl:grid-cols-12", "5xl:grid-cols-none",
//     "6xl:grid-cols-1", "6xl:grid-cols-2", "6xl:grid-cols-3", "6xl:grid-cols-4", "6xl:grid-cols-5", "6xl:grid-cols-6", "6xl:grid-cols-7", "6xl:grid-cols-8", "6xl:grid-cols-9", "6xl:grid-cols-10", "6xl:grid-cols-11", "6xl:grid-cols-12", "6xl:grid-cols-none",
//     "lg:col-span-2",
//     'grid-rows-1', 'grid-rows-2', 'grid-rows-3', 'grid-rows-4', 'grid-rows-5', 'grid-rows-6', 'grid-rows-none',
//     'gap-0', 'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6', 'gap-8', 'gap-10', 'gap-12', 'gap-16', 'gap-20', 'gap-24', 'gap-32', 'gap-40', 'gap-48', 'gap-56', 'gap-64', 'gap-px',
//     'gap-x-0', 'gap-x-1', 'gap-x-2', 'gap-x-3', 'gap-x-4', 'gap-x-5', 'gap-x-6', 'gap-x-8', 'gap-x-10', 'gap-x-12', 'gap-x-16', 'gap-x-20', 'gap-x-24', 'gap-x-32', 'gap-x-40', 'gap-x-48', 'gap-x-56', 'gap-x-64', 'gap-x-px',
//     'gap-y-0', 'gap-y-1', 'gap-y-2', 'gap-y-3', 'gap-y-4', 'gap-y-5', 'gap-y-6', 'gap-y-8', 'gap-y-10', 'gap-y-12', 'gap-y-16', 'gap-y-20', 'gap-y-24', 'gap-y-32', 'gap-y-40', 'gap-y-48', 'gap-y-56', 'gap-y-64', 'gap-y-px',
    
//     // Position
//     'static', 'fixed', 'absolute', 'relative', 'sticky',
//     'inset-0', 'inset-auto', 'inset-y-0', 'inset-x-0', 'inset-y-auto', 'inset-x-auto',
//     'top-0', 'top-auto', 'right-0', 'right-auto', 'bottom-0', 'bottom-auto', 'left-0', 'left-auto',
//     'top-1/2', 'right-1/2', 'bottom-1/2', 'left-1/2',
//     'top-1/3', 'right-1/3', 'bottom-1/3', 'left-1/3',
//     'top-2/3', 'right-2/3', 'bottom-2/3', 'left-2/3',
//     'top-1/4', 'right-1/4', 'bottom-1/4', 'left-1/4',
//     'top-3/4', 'right-3/4', 'bottom-3/4', 'left-3/4',
//     'top-1/5', 'right-1/5', 'bottom-1/5', 'left-1/5',
//     'top-2/5', 'right-2/5', 'bottom-2/5', 'left-2/5',
//     'top-3/5', 'right-3/5', 'bottom-3/5', 'left-3/5',
//     'top-1/6', 'right-1/6', 'bottom-1/6', 'left-1/6',
//     'top-2/6', 'right-2/6', 'bottom-2/6', 'left-2/6',
//     'top-3/6', 'right-3/6', 'bottom-3/6', 'left-3/6',
//     'top-4/6', 'right-4/6', 'bottom-4/6', 'left-4/6',
//     'top-5/6', 'right-5/6', 'bottom-5/6', 'left-5/6',
//     "top-1", "top-2", "top-3", "top-4", "top-5", "top-6", "top-7", "top-8", "top-9", "top-10",
//     "right-1", "right-2", "right-3", "right-4", "right-5", "right-6", "right-7", "right-8", "right-9", "right-10",
//     "bottom-1", "bottom-2", "bottom-3", "bottom-4", "bottom-5", "bottom-6", "bottom-7", "bottom-8", "bottom-9", "bottom-10",
//     "left-1", "left-2", "left-3", "left-4", "left-5", "left-6", "left-7", "left-8", "left-9", "left-10",
    
//     '-top-1/2', '-right-1/2', '-bottom-1/2', '-left-1/2',
//     '-top-1/3', '-right-1/3', '-bottom-1/3', '-left-1/3',
//     '-top-2/3', '-right-2/3', '-bottom-2/3', '-left-2/3',
//     '-top-1/4', '-right-1/4', '-bottom-1/4', '-left-1/4',
//     '-top-3/4', '-right-3/4', '-bottom-3/4', '-left-3/4',
//     '-top-1/5', '-right-1/5', '-bottom-1/5', '-left-1/5',
//     '-top-2/5', '-right-2/5', '-bottom-2/5', '-left-2/5',
//     '-top-3/5', '-right-3/5', '-bottom-3/5', '-left-3/5',
//     '-top-1/6', '-right-1/6', '-bottom-1/6', '-left-1/6',
//     '-top-2/6', '-right-2/6', '-bottom-2/6', '-left-2/6',
//     '-top-3/6', '-right-3/6', '-bottom-3/6', '-left-3/6',
//     '-top-4/6', '-right-4/6', '-bottom-4/6', '-left-4/6',
//     '-top-5/6', '-right-5/6', '-bottom-5/6', '-left-5/6',
//     "-top-1", "-top-2", "-top-3", "-top-4", "-top-5", "-top-6", "-top-7", "-top-8", "-top-9", "-top-10",
//     "-right-1", "-right-2", "-right-3", "-right-4", "-right-5", "-right-6", "-right-7", "-right-8", "-right-9", "-right-10","-right-12","-right-16","-right-20","-right-24","-right-32","-right-40","-right-48","-right-56","-right-64",
//     "-bottom-1", "-bottom-2", "-bottom-3", "-bottom-4", "-bottom-5", "-bottom-6", "-bottom-7", "-bottom-8", "-bottom-9", "-bottom-10",
//     "-left-1", "-left-2", "-left-3", "-left-4", "-left-5", "-left-6", "-left-7", "-left-8", "-left-9", "-left-10","-left-12","-left-16","-left-20","-left-24","-left-32","-left-40","-left-48","-left-56","-left-64",
//     "rtl:left-3", "ltr:right-3", "rtl:right-3", "ltr:left-3", "rtl:left-12", "ltr:right-12", "rtl:right-12", "ltr:left-12", "rtl:left-16", "ltr:right-16", "rtl:right-16", "ltr:left-16", "rtl:left-20", "ltr:right-20", "rtl:right-20", "ltr:left-20", "rtl:left-24", "ltr:right-24", "rtl:right-24", "ltr:left-24", "rtl:left-32", "ltr:right-32", "rtl:right-32", "ltr:left-32", "rtl:left-40", "ltr:right-40", "rtl:right-40", "ltr:left-40", "rtl:left-48", "ltr:right-48", "rtl:right-48", "ltr:left-48", "rtl:left-56", "ltr:right-56", "rtl:right-56", "ltr:left-56", "rtl:left-64", "ltr:right-64", "rtl:right-64", "ltr:left-64",
    
    
//     // Z-Index
//     'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50', 'z-auto',
    
//     // Overflow
//     'overflow-auto', 'overflow-hidden', 'overflow-visible', 'overflow-scroll', 'overflow-x-auto', 'overflow-y-auto', 'overflow-x-hidden', 'overflow-y-hidden', 'overflow-x-visible', 'overflow-y-visible', 'overflow-x-scroll', 'overflow-y-scroll',
    
//     // Shadows
//     'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner', 'shadow-none',
    
//     // Opacity
//     'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100',
    
//     // Transform
//     'transform', 'transform-none', 'scale-0', 'scale-50', 'scale-75', 'scale-90', 'scale-95', 'scale-100', 'scale-105', 'scale-110', 'scale-125', 'scale-150',
//     'rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180',
//     'translate-x-0', 'translate-x-1', 'translate-x-2', 'translate-x-3', 'translate-x-4', 'translate-x-5', 'translate-x-6', 'translate-x-8', 'translate-x-10', 'translate-x-12', 'translate-x-16', 'translate-x-20', 'translate-x-24', 'translate-x-32', 'translate-x-40', 'translate-x-48', 'translate-x-56', 'translate-x-64', 'translate-x-px', 'translate-x-0.5', 'translate-x-1.5', 'translate-x-2.5', 'translate-x-3.5', 'translate-x-1/2', 'translate-x-1/3', 'translate-x-2/3', 'translate-x-1/4', 'translate-x-2/4', 'translate-x-3/4', 'translate-x-1/5', 'translate-x-2/5', 'translate-x-3/5', 'translate-x-4/5', 'translate-x-1/6', 'translate-x-2/6', 'translate-x-3/6', 'translate-x-4/6', 'translate-x-5/6', 'translate-x-1/12', 'translate-x-2/12', 'translate-x-3/12', 'translate-x-4/12', 'translate-x-5/12', 'translate-x-6/12', 'translate-x-7/12', 'translate-x-8/12', 'translate-x-9/12', 'translate-x-10/12', 'translate-x-11/12', 'translate-x-full',
//     'translate-y-0', 'translate-y-1', 'translate-y-2', 'translate-y-3', 'translate-y-4', 'translate-y-5', 'translate-y-6', 'translate-y-8', 'translate-y-10', 'translate-y-12', 'translate-y-16', 'translate-y-20', 'translate-y-24', 'translate-y-32', 'translate-y-40', 'translate-y-48', 'translate-y-56', 'translate-y-64', 'translate-y-px', 'translate-y-0.5', 'translate-y-1.5', 'translate-y-2.5', 'translate-y-3.5', 'translate-y-1/2', 'translate-y-1/3', 'translate-y-2/3', 'translate-y-1/4', 'translate-y-2/4', 'translate-y-3/4', 'translate-y-1/5', 'translate-y-2/5', 'translate-y-3/5', 'translate-y-4/5', 'translate-y-1/6', 'translate-y-2/6', 'translate-y-3/6', 'translate-y-4/6', 'translate-y-5/6', 'translate-y-1/12', 'translate-y-2/12', 'translate-y-3/12', 'translate-y-4/12', 'translate-y-5/12', 'translate-y-6/12', 'translate-y-7/12', 'translate-y-8/12', 'translate-y-9/12', 'translate-y-10/12', 'translate-y-11/12', 'translate-y-full',
//     '-translate-x-0', '-translate-x-1', '-translate-x-2', '-translate-x-3', '-translate-x-4', '-translate-x-5', '-translate-x-6', '-translate-x-8', '-translate-x-10', '-translate-x-12', '-translate-x-16', '-translate-x-20', '-translate-x-24', '-translate-x-32', '-translate-x-40', '-translate-x-48', '-translate-x-56', '-translate-x-64', '-translate-x-px', '-translate-x-0.5', '-translate-x-1.5', '-translate-x-2.5', '-translate-x-3.5', '-translate-x-1/2', '-translate-x-1/3', '-translate-x-2/3', '-translate-x-1/4', '-translate-x-2/4', '-translate-x-3/4', '-translate-x-1/5', '-translate-x-2/5', '-translate-x-3/5', '-translate-x-4/5', '-translate-x-1/6', '-translate-x-2/6', '-translate-x-3/6', '-translate-x-4/6', '-translate-x-5/6', '-translate-x-1/12', '-translate-x-2/12', '-translate-x-3/12', '-translate-x-4/12', '-translate-x-5/12', '-translate-x-6/12', '-translate-x-7/12', '-translate-x-8/12', '-translate-x-9/12', '-translate-x-10/12', '-translate-x-11/12', '-translate-x-full',
//     '-translate-y-0', '-translate-y-1', '-translate-y-2', '-translate-y-3', '-translate-y-4', '-translate-y-5', '-translate-y-6', '-translate-y-8', '-translate-y-10', '-translate-y-12', '-translate-y-16', '-translate-y-20', '-translate-y-24', '-translate-y-32', '-translate-y-40', '-translate-y-48', '-translate-y-56', '-translate-y-64', '-translate-y-px', '-translate-y-0.5', '-translate-y-1.5', '-translate-y-2.5', '-translate-y-3.5', '-translate-y-1/2', '-translate-y-1/3', '-translate-y-2/3', '-translate-y-1/4', '-translate-y-2/4', '-translate-y-3/4', '-translate-y-1/5', '-translate-y-2/5', '-translate-y-3/5', '-translate-y-4/5', '-translate-y-1/6', '-translate-y-2/6', '-translate-y-3/6', '-translate-y-4/6', '-translate-y-5/6', '-translate-y-1/12', '-translate-y-2/12', '-translate-y-3/12', '-translate-y-4/12', '-translate-y-5/12', '-translate-y-6/12', '-translate-y-7/12', '-translate-y-8/12', '-translate-y-9/12', '-translate-y-10/12', '-translate-y-11/12', '-translate-y-full',
    
//     // Transitions
//     'transition-none', 'transition-all', 'transition', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform',
//     'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000',
//     'ease-linear', 'ease-in', 'ease-out', 'ease-in-out',
//     'delay-75', 'delay-100', 'delay-150', 'delay-200', 'delay-300', 'delay-500', 'delay-700', 'delay-1000',
    
//     // Cursor
//     'cursor-auto', 'cursor-default', 'cursor-pointer', 'cursor-wait', 'cursor-text', 'cursor-move', 'cursor-help', 'cursor-not-allowed',
    
//     // User Select
//     'select-none', 'select-text', 'select-all', 'select-auto',
    
//     // Background
//     'bg-fixed', 'bg-local', 'bg-scroll', 'bg-clip-border', 'bg-clip-padding', 'bg-clip-content', 'bg-clip-text',
//     'bg-origin-border', 'bg-origin-padding', 'bg-origin-content',
//     'bg-repeat', 'bg-no-repeat', 'bg-repeat-x', 'bg-repeat-y', 'bg-repeat-round', 'bg-repeat-space',
//     'bg-auto', 'bg-cover', 'bg-contain', 'bg-none',
//     'bg-bottom', 'bg-center', 'bg-left', 'bg-left-bottom', 'bg-left-top', 'bg-right', 'bg-right-bottom', 'bg-right-top', 'bg-top',
    
//     // Backdrop
//     'backdrop-blur-none', 'backdrop-blur-sm', 'backdrop-blur', 'backdrop-blur-md', 'backdrop-blur-lg', 'backdrop-blur-xl', 'backdrop-blur-2xl', 'backdrop-blur-3xl',
//     'backdrop-brightness-0', 'backdrop-brightness-50', 'backdrop-brightness-75', 'backdrop-brightness-90', 'backdrop-brightness-95', 'backdrop-brightness-100', 'backdrop-brightness-105', 'backdrop-brightness-110', 'backdrop-brightness-125', 'backdrop-brightness-150', 'backdrop-brightness-200',
//     'backdrop-contrast-0', 'backdrop-contrast-50', 'backdrop-contrast-75', 'backdrop-contrast-100', 'backdrop-contrast-125', 'backdrop-contrast-150', 'backdrop-contrast-200',
//     'backdrop-grayscale', 'backdrop-grayscale-0',
//     'backdrop-hue-rotate-0', 'backdrop-hue-rotate-15', 'backdrop-hue-rotate-30', 'backdrop-hue-rotate-60', 'backdrop-hue-rotate-90', 'backdrop-hue-rotate-180',
//     'backdrop-invert', 'backdrop-invert-0',
//     'backdrop-opacity-0', 'backdrop-opacity-5', 'backdrop-opacity-10', 'backdrop-opacity-20', 'backdrop-opacity-25', 'backdrop-opacity-30', 'backdrop-opacity-40', 'backdrop-opacity-50', 'backdrop-opacity-60', 'backdrop-opacity-70', 'backdrop-opacity-75', 'backdrop-opacity-80', 'backdrop-opacity-90', 'backdrop-opacity-95', 'backdrop-opacity-100',
//     'backdrop-saturate-0', 'backdrop-saturate-50', 'backdrop-saturate-100', 'backdrop-saturate-150', 'backdrop-saturate-200',
//     'backdrop-sepia', 'backdrop-sepia-0',
    
//     // Focus
//     'focus:outline-none', 'focus:outline', 'focus:outline-dashed', 'focus:outline-dotted', 'focus:outline-double',
//     'focus:ring-0', 'focus:ring-1', 'focus:ring-2', 'focus:ring-4', 'focus:ring-8',
//     'focus:ring-offset-0', 'focus:ring-offset-1', 'focus:ring-offset-2', 'focus:ring-offset-4', 'focus:ring-offset-8',
//     'focus:ring-blue-500', 'focus:ring-blue-600', 'focus:ring-gray-500', 'focus:ring-red-500', 'focus:ring-green-500', 'focus:ring-yellow-500', 'focus:ring-indigo-500', 'focus:ring-purple-500', 'focus:ring-pink-500',
    
//     // Hover
//     'hover:bg-gray-100', 'hover:bg-gray-200', 'hover:bg-gray-300', 'hover:bg-gray-400', 'hover:bg-gray-500', 'hover:bg-gray-600', 'hover:bg-gray-700', 'hover:bg-gray-800', 'hover:bg-gray-900',
//     'hover:bg-red-100', 'hover:bg-red-200', 'hover:bg-red-300', 'hover:bg-red-400', 'hover:bg-red-500', 'hover:bg-red-600', 'hover:bg-red-700', 'hover:bg-red-800', 'hover:bg-red-900',
//     'hover:bg-blue-100', 'hover:bg-blue-200', 'hover:bg-blue-300', 'hover:bg-blue-400', 'hover:bg-blue-500', 'hover:bg-blue-600', 'hover:bg-blue-700', 'hover:bg-blue-800', 'hover:bg-blue-900',
//     'hover:bg-green-100', 'hover:bg-green-200', 'hover:bg-green-300', 'hover:bg-green-400', 'hover:bg-green-500', 'hover:bg-green-600', 'hover:bg-green-700', 'hover:bg-green-800', 'hover:bg-green-900',
//     'hover:text-gray-100', 'hover:text-gray-200', 'hover:text-gray-300', 'hover:text-gray-400', 'hover:text-gray-500', 'hover:text-gray-600', 'hover:text-gray-700', 'hover:text-gray-800', 'hover:text-gray-900',
//     'hover:text-red-100', 'hover:text-red-200', 'hover:text-red-300', 'hover:text-red-400', 'hover:text-red-500', 'hover:text-red-600', 'hover:text-red-700', 'hover:text-red-800', 'hover:text-red-900',
//     'hover:text-blue-100', 'hover:text-blue-200', 'hover:text-blue-300', 'hover:text-blue-400', 'hover:text-blue-500', 'hover:text-blue-600', 'hover:text-blue-700', 'hover:text-blue-800', 'hover:text-blue-900',
//     'hover:text-green-100', 'hover:text-green-200', 'hover:text-green-300', 'hover:text-green-400', 'hover:text-green-500', 'hover:text-green-600', 'hover:text-green-700', 'hover:text-green-800', 'hover:text-green-900',
//     'hover:shadow-lg', 'hover:shadow-xl', 'hover:shadow-2xl',
//     'hover:scale-105', 'hover:scale-110', 'hover:scale-125', 'hover:scale-150',
//     'hover:rotate-1', 'hover:rotate-2', 'hover:rotate-3', 'hover:rotate-6', 'hover:rotate-12', 'hover:rotate-45', 'hover:rotate-90', 'hover:rotate-180',
//     'hover:translate-x-1', 'hover:translate-x-2', 'hover:translate-x-3', 'hover:translate-x-4', 'hover:translate-x-5', 'hover:translate-x-6', 'hover:translate-x-8', 'hover:translate-x-10', 'hover:translate-x-12', 'hover:translate-x-16', 'hover:translate-x-20', 'hover:translate-x-24', 'hover:translate-x-32', 'hover:translate-x-40', 'hover:translate-x-48', 'hover:translate-x-56', 'hover:translate-x-64', 'hover:translate-x-px', 'hover:translate-x-0.5', 'hover:translate-x-1.5', 'hover:translate-x-2.5', 'hover:translate-x-3.5', 'hover:translate-x-1/2', 'hover:translate-x-1/3', 'hover:translate-x-2/3', 'hover:translate-x-1/4', 'hover:translate-x-2/4', 'hover:translate-x-3/4', 'hover:translate-x-1/5', 'hover:translate-x-2/5', 'hover:translate-x-3/5', 'hover:translate-x-4/5', 'hover:translate-x-1/6', 'hover:translate-x-2/6', 'hover:translate-x-3/6', 'hover:translate-x-4/6', 'hover:translate-x-5/6', 'hover:translate-x-1/12', 'hover:translate-x-2/12', 'hover:translate-x-3/12', 'hover:translate-x-4/12', 'hover:translate-x-5/12', 'hover:translate-x-6/12', 'hover:translate-x-7/12', 'hover:translate-x-8/12', 'hover:translate-x-9/12', 'hover:translate-x-10/12', 'hover:translate-x-11/12', 'hover:translate-x-full',
//     'hover:translate-y-1', 'hover:translate-y-2', 'hover:translate-y-3', 'hover:translate-y-4', 'hover:translate-y-5', 'hover:translate-y-6', 'hover:translate-y-8', 'hover:translate-y-10', 'hover:translate-y-12', 'hover:translate-y-16', 'hover:translate-y-20', 'hover:translate-y-24', 'hover:translate-y-32', 'hover:translate-y-40', 'hover:translate-y-48', 'hover:translate-y-56', 'hover:translate-y-64', 'hover:translate-y-px', 'hover:translate-y-0.5', 'hover:translate-y-1.5', 'hover:translate-y-2.5', 'hover:translate-y-3.5', 'hover:translate-y-1/2', 'hover:translate-y-1/3', 'hover:translate-y-2/3', 'hover:translate-y-1/4', 'hover:translate-y-2/4', 'hover:translate-y-3/4', 'hover:translate-y-1/5', 'hover:translate-y-2/5', 'hover:translate-y-3/5', 'hover:translate-y-4/5', 'hover:translate-y-1/6', 'hover:translate-y-2/6', 'hover:translate-y-3/6', 'hover:translate-y-4/6', 'hover:translate-y-5/6', 'hover:translate-y-1/12', 'hover:translate-y-2/12', 'hover:translate-y-3/12', 'hover:translate-y-4/12', 'hover:translate-y-5/12', 'hover:translate-y-6/12', 'hover:translate-y-7/12', 'hover:translate-y-8/12', 'hover:translate-y-9/12', 'hover:translate-y-10/12', 'hover:translate-y-11/12', 'hover:translate-y-full',
    
//     // Active
//     'active:scale-95', 'active:scale-90', 'active:scale-75', 'active:scale-50',
    
//     // Custom Primary Colors (keeping your existing custom colors)
//     'bg-primary-main', 'bg-primary-light', 'bg-primary-dark',
//     'bg-primary-main/10', 'bg-primary-light/10', 'bg-primary-dark/10',
//     'bg-primary-main/20', 'bg-primary-light/20', 'bg-primary-dark/20',
//     'bg-primary-main/30', 'bg-primary-light/30', 'bg-primary-dark/30',
//     'bg-primary-main/40', 'bg-primary-light/40', 'bg-primary-dark/40',
//     'bg-primary-main/50', 'bg-primary-light/50', 'bg-primary-dark/50',
//     'bg-primary-main/60', 'bg-primary-light/60', 'bg-primary-dark/60',
//     'bg-primary-main/70', 'bg-primary-light/70', 'bg-primary-dark/70',
//     'bg-primary-main/80', 'bg-primary-light/80', 'bg-primary-dark/80',
//     'bg-primary-main/90', 'bg-primary-light/90', 'bg-primary-dark/90',
//     'bg-primary-main/100', 'bg-primary-light/100', 'bg-primary-dark/100',
//     "from-primary-main", "from-primary-light", "from-primary-dark",
//     "from-primary-main/10", "from-primary-light/10", "from-primary-dark/10",
//     "from-primary-main/20", "from-primary-light/20", "from-primary-dark/20",
//     "from-primary-main/30", "from-primary-light/30", "from-primary-dark/30",
//     "from-primary-main/40", "from-primary-light/40", "from-primary-dark/40",
//     "from-primary-main/50", "from-primary-light/50", "from-primary-dark/50",
//     "from-primary-main/60", "from-primary-light/60", "from-primary-dark/60",
//     "from-primary-main/70", "from-primary-light/70", "from-primary-dark/70",
//     "from-primary-main/80", "from-primary-light/80", "from-primary-dark/80",
//     "from-primary-main/90", "from-primary-light/90", "from-primary-dark/90",
//     "from-primary-main/100", "from-primary-light/100", "from-primary-dark/100",
//     "to-primary-main", "to-primary-light", "to-primary-dark",
//     "to-primary-main/10", "to-primary-light/10", "to-primary-dark/10",
//     "to-primary-main/20", "to-primary-light/20", "to-primary-dark/20",
//     "to-primary-main/30", "to-primary-light/30", "to-primary-dark/30",
//     "to-primary-main/40", "to-primary-light/40", "to-primary-dark/40",
//     "to-primary-main/50", "to-primary-light/50", "to-primary-dark/50",
//     "to-primary-main/60", "to-primary-light/60", "to-primary-dark/60",
//     "to-primary-main/70", "to-primary-light/70", "to-primary-dark/70",
//     "to-primary-main/80", "to-primary-light/80", "to-primary-dark/80",
//     "to-primary-main/90", "to-primary-light/90", "to-primary-dark/90",
//     "to-primary-main/100", "to-primary-light/100", "to-primary-dark/100",
//     'text-primary-main', 'text-primary-light', 'text-primary-dark',
//     'border-primary-main', 'border-primary-light', 'border-primary-dark',
//     'hover:bg-primary-main', 'hover:bg-primary-light', 'hover:bg-primary-dark',
//     'hover:text-primary-main', 'hover:text-primary-light', 'hover:text-primary-dark',
//     "space-y-8","space-y-4","space-y-2","space-y-1","space-y-0",
//     "space-x-8","space-x-4","space-x-2","space-x-1","space-x-0",
//     "space-x-reverse",
//     "space-x-reverse",
//     "hover:bg-gradient-to-r", "hover:from-primary-light/5", "hover:to-secondary-main/5",
//     "from-primary-light/10", "to-secondary-main/10",
//     "divide-primary-main/50",
//     // Custom Secondary Colors
//     'bg-secondary-main', 'bg-secondary-light', 'bg-secondary-dark',
//     'text-secondary-main', 'text-secondary-light', 'text-secondary-dark',
//     'border-secondary-main', 'border-secondary-light', 'border-secondary-dark',
//     'hover:bg-secondary-main', 'hover:bg-secondary-light', 'hover:bg-secondary-dark',
//     'hover:text-secondary-main', 'hover:text-secondary-light', 'hover:text-secondary-dark'
//   ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 