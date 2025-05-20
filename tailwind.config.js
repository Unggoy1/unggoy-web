// tailwind.config.js
export default {
    corePlugins: {
        container: false   // <-- removes those max-width rules entirely

    },
    prefix: 'tw-',      // every utility becomes .tw-container, .tw-flex, …

}
