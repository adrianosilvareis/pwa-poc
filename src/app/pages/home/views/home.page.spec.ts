import { render, screen } from '@testing-library/angular';

import { HomePage } from './home.page';
import { ListComponent } from '@root/app/shared/components/list/list.component';

describe('HomeComponent', () => {
  it('should create', async () => {
    // given
    await render(HomePage, {
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

