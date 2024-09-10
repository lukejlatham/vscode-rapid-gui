import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TemplatesDialog } from '../../pages/EditingInterface/TemplatesDialog';
import { IntlProvider } from 'react-intl';
import English from '../../Features/languages/en.json';

describe('TemplatesDialog', () => {
  const mockOnClose = jest.fn();
  const mockCloseStartDialog = jest.fn();
  const mockSetPages = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    closeStartDialog: mockCloseStartDialog,
    mode: 'start',
    pages: [],
    setPages: mockSetPages,
  };

  const renderComponent = (props = {}) => {
    return render(
      <IntlProvider messages={English} locale="en">
        <TemplatesDialog {...defaultProps} {...props} />
      </IntlProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // unit tests:
  it('renders correctly when open', () => {
    renderComponent();
    expect(screen.getByTestId('templatesDialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('templatesDialog-content')).toBeInTheDocument();
  });

  it('renders all template cards', () => {
    renderComponent();
    expect(screen.getByTestId('website-card')).toBeInTheDocument();
    expect(screen.getByTestId('login-card')).toBeInTheDocument();
    expect(screen.getByTestId('video-game-card')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-card')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderComponent({ isOpen: false });
    expect(screen.queryByTestId('templatesDialog-title')).not.toBeInTheDocument();
  });

  // integration tests:
  it('calls onClose when cancel button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('sets pages and closes dialogs when a template is clicked in start mode', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('website-card'));
    expect(mockSetPages).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'Website' })
    ]));
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockCloseStartDialog).toHaveBeenCalled();
  });

  it('adds a page and closes dialogs when a template is clicked in add mode', () => {
    const existingPages = [{ id: '1', name: 'Existing Page', content: {} }];
    renderComponent({ mode: 'add', pages: existingPages });
    fireEvent.click(screen.getByTestId('login-card'));
    expect(mockSetPages).toHaveBeenCalledWith(expect.arrayContaining([
      ...existingPages,
      expect.objectContaining({ name: 'Login Page' })
    ]));
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockCloseStartDialog).toHaveBeenCalled();
  });
});