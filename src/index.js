import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const test = () => {
    console.log('test');
  };

var debounce = require('lodash.debounce');
var debounced = debounce(test, DEBOUNCE_DELAY);

document.querySelector('button').addEventListener('click', debounced);









Notiflix.Notify.success('Sol lucet omnibus');
Notiflix.Notify.failure('Qui timide rogat docet negare');
Notiflix.Notify.warning('Memento te hominem esse');
Notiflix.Notify.info('Cogito ergo sum');
