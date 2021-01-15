module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    i18n: {
        locales: ['he', 'en'],
        defaultLocale: 'he', // The default locale to fall back to
        localeDetection: false, // Disable automatic locale detection on `/`
    },
    images: {
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/dwpv9gjkj',
    },
};
