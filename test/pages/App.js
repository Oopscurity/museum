import React from 'react';
import {
  renderIntoDocument as render,
  findRenderedComponentWithType as findWithType,
  findRenderedDOMComponentWithClass as findWithClass
} from 'react-addons-test-utils';
import { expect } from 'chai';
import Provider from 'react-redux/lib/components/Provider';

import configureStore from '../../src/store';
import App from '../../src/pages/App';

describe('App', () => {
  const store = configureStore();

  describe('raw:', () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    it('can be rendered', () => {
      expect(component).to.be.ok;
    });

    it('renders with "App" type', () => {
      const app = findWithType(component, App);
      expect(app).to.be.ok;
    });

    it('renders a DOM node with "page" class', () => {
      const page = findWithClass(component, 'page');
      expect(page).to.be.ok;
    });
  });

  describe('with children:', () => {
    it('renders this.props.children components', () => {
      const child = <div className="child">Child component content</div>;
      const component = render(
        <Provider store={store}>
          <App>{child}</App>
        </Provider>
      );

      const renderedChild = findWithClass(component, 'child');
      expect(renderedChild).to.be.ok;
      expect(renderedChild.textContent).to.equal('Child component content');
    });
  });
});
