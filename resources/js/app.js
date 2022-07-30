import App from './components/App.svelte';

const app = new App({
    target: document.querySelector('#app'),
    props: {
        name: 'Daffodil',
    },
});

export default app;