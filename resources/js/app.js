/* eslint func-names: 0 */
import React from 'react';
import { render } from 'react-dom';
import FaqTemplate from './components/templates/FaqTemplate/index';

let appFaq = document.getElementById('js-faq');
if (appFaq) {
	render(<FaqTemplate />, appFaq);
}
