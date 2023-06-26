import { render, screen } from '@testing-library/angular';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  it('should render title with correct input', async () => {
    // given
    await render(ToolbarComponent, {
      componentInputs:{
        title: 'TITLE',
        links:[{ path: 'PATH', title: 'ROUTER_TITLE'}]
      }
    });

    // when
    const title = screen.getByTestId('title');

    // then
    expect(title.textContent).toBe('TITLE');
  });

  it('should render links with corrects inputs', async () => {
    // given
    await render(ToolbarComponent, {
      componentInputs:{
        title: 'TITLE',
        links:[{ path: 'PATH', title: 'ROUTER_TITLE'}]
      }
    });

    // when
    const link = screen.getByTitle('ROUTER_TITLE');

    // then
    expect(link.textContent).toBe('Router_title');
  });
});

