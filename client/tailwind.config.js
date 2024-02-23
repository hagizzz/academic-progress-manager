/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#54f2c0',

                    secondary: '#dda044',

                    accent: '#c3f78c',

                    neutral: '#332334',

                    'base-100': '#f4f0f5',

                    info: '#92aae3',

                    success: '#23c78e',

                    warning: '#e9900c',

                    error: '#e85d45',
                },
            },
            'lofi',
            'garden',
            'winter',
        ],
    },

    theme: {
        extend: {
            fontFamily: {
                mukta: ['Mukta', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
        },
    },

    plugins: [require('@tailwindcss/typography'), require('daisyui')],

    daisyui: {
        themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'light', // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    },
}
