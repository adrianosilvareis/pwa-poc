import { render, screen } from '@testing-library/angular';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  it('should create item on added data', async () => {
    // given
    await render(ListComponent, {
      componentInputs:{
        data: ['TESTE']
      }
    })

    // when
    const li = screen.getByText('TESTE');

    // then
    expect(li).toBeInstanceOf(HTMLElement);
    expect(li.textContent).toBe('TESTE')
  });
});

