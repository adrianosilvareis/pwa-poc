import { render, screen } from '@testing-library/angular';

import { LoadingComponent } from './loading.component';
import { MaterialModule } from '@root/app/material/material.module';

describe('LoadingComponent', () => {
  it('should create', async () => {
    // given
    await render(LoadingComponent, {
      imports:[MaterialModule],
    });
    // when
    const progressbar = screen.getByRole('progressbar');

    // then
    expect(progressbar.getAttribute('mode')).toBe('indeterminate');
  });
});
