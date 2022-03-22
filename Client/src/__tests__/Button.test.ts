import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render } from '@testing-library/svelte';
import Button from '../components/Button.svelte';
import userEvent from '@testing-library/user-event';

it('should have an onclick event that works', () => {
  const { getByLabelText, component } = render(Button, {
         props: { name: '' }
  });
  const mock = jest.fn();
  const button = getByLabelText('button');
  component.$on('submit', mock());
  userEvent.click(button);
  expect(mock).toHaveBeenCalled();
})