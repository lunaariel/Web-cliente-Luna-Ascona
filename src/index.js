import { RenderCards } from './components/cards.js';
import { initCartView } from './cart/cartView.js';
import { initLocalStorage } from './storage/storage.js';

initLocalStorage();
initCartView();
RenderCards();
