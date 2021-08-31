import Home from '@pages/index';
import { render, screen } from '@testing-library/react';

describe('Sample test', () => {
  it('Passes', async () => {
    (global as any).fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            data: [
              { id: 7654567, passphrase: 'kjuyhgy' },
              { id: 8765678, passphrase: 'kiuy6545tgh' },
            ],
          }),
      })
      .mockResolvedValueOnce({ json: () => Promise.resolve({ data: null }) });

    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
    expect(await screen.findByRole('page-title')).toHaveTextContent(
      'Swarm Traefik DigitalOcean'
    );
  });
});
