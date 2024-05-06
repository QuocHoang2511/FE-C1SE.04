
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primaryColor: '#4A85F6',
                textColor: '#252525',
            },
        },
    },
    plugins: [],
});

