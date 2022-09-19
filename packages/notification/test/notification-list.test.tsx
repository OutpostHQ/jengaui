import userEvent from '@testing-library/user-event';

import { render } from '../../../test';

import { NotificationsList } from '../src/NotificationsList';

describe('<NotificationList />', () => {
  it('should render notification list', () => {
    const { getByText } = render(
      <NotificationsList>
        <NotificationsList.Item description="test1" />
        <NotificationsList.Item description="test2" />
        <NotificationsList.Item description="test3" />
      </NotificationsList>,
    );

    expect(getByText(/test1/)).toBeInTheDocument();
    expect(getByText(/test2/)).toBeInTheDocument();
    expect(getByText(/test3/)).toBeInTheDocument();
  });

  it('should handle onDismiss', async () => {
    const onDismiss = jest.fn();

    const { getByTestId } = render(
      <NotificationsList onDismiss={onDismiss}>
        <NotificationsList.Item description="test1" />
      </NotificationsList>,
    );

    await userEvent.click(getByTestId('NotificationCloseButton'));

    expect(onDismiss).toHaveBeenCalled();
  });
});
