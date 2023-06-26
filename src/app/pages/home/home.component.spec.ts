import { render, screen } from '@testing-library/angular';

import { HomeComponent } from './home.component';
import { ListComponent } from '@root/app/shared/components/list/list.component';

describe('HomeComponent', () => {
  it('should create', async () => {
    // given
    await render(HomeComponent, {
      declarations:[ListComponent],
      componentProperties: {
        items: ['ONE_ITEM']
      }
    })

    // when
    const li = screen.getByText('ONE_ITEM');

    // then
    expect(li.textContent).toBe('ONE_ITEM');
  });
});

