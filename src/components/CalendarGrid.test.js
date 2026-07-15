import { render, screen, fireEvent, act } from '@testing-library/react';
import CalendarGrid from './CalendarGrid';

describe('CalendarGrid interactions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('click opens the day action', () => {
    const onDayClick = jest.fn();
    const onDayLongPress = jest.fn();

    render(
      <CalendarGrid
        year={2026}
        month={6}
        days={{}}
        onDayClick={onDayClick}
        onDayLongPress={onDayLongPress}
        selectedDateKey={null}
      />
    );

    fireEvent.mouseDown(screen.getByText('15'));
    act(() => {
      jest.advanceTimersByTime(200);
    });
    fireEvent.mouseUp(screen.getByText('15'));
    fireEvent.click(screen.getByText('15'));

    expect(onDayLongPress).not.toHaveBeenCalled();
    expect(onDayClick).toHaveBeenCalledWith('2026-07-15');
  });

  test('long press selects day without click action', () => {
    const onDayClick = jest.fn();
    const onDayLongPress = jest.fn();

    render(
      <CalendarGrid
        year={2026}
        month={6}
        days={{}}
        onDayClick={onDayClick}
        onDayLongPress={onDayLongPress}
        selectedDateKey={null}
      />
    );

    fireEvent.mouseDown(screen.getByText('15'));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.mouseUp(screen.getByText('15'));
    fireEvent.click(screen.getByText('15'));

    expect(onDayLongPress).toHaveBeenCalledWith('2026-07-15');
    expect(onDayClick).not.toHaveBeenCalled();
  });
});

