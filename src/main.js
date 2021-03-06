import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

import BaseCard from './components/UI/BaseCard';
import BaseBadge from './components/UI/BaseBadge';
import BaseButton from './components/UI/BaseButton';
import BaseSpinner from './components/UI/BaseSpinner';
import BaseDialog from './components/UI/BaseDialog';


const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);


app.mount('#app');
