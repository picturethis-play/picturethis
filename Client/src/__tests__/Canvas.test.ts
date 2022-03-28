import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render } from '@testing-library/svelte';
import Canvas from '../components/Canvas.svelte';
import userEvent from '@testing-library/user-event';

it('should render a canvas on the screen on mount', () => {
  const { component } = render(Canvas);
  console.log(component);
});
