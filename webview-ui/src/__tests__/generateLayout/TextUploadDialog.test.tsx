import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TextDialog } from '../../Features/generateLayout/textUpload/TextUploadDialog';
import { IntlProvider } from 'react-intl';
import English from '../../Features/languages/en.json';

// Mock the handleTextUpload function
jest.mock('../../Features/generateLayout/textUpload/handleTextUpload', () => ({
  handleTextUpload: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TextDialog', () => {
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
        <TextDialog {...defaultProps} {...props} />
      </IntlProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // unit tests:
  it('renders correctly when open', () => {
    renderComponent();
    expect(screen.getByTestId('textDialog-title')).toHaveTextContent('Generate From Text');
    expect(screen.getByTestId('textDialog-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('process-text-button')).toBeInTheDocument();
    expect(screen.getByTestId('process-text-button')).toHaveTextContent('Process Text');

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderComponent({ isOpen: false });
    expect(screen.queryByTestId('textDialog-title')).not.toBeInTheDocument();
  });

  // integration tests:
  it('allows text input', () => {
    renderComponent();
    const textarea = screen.getByTestId('textDialog-textarea');
    fireEvent.change(textarea, { target: { value: 'Test input' } });
    expect(textarea).toHaveValue('Test input');
  });

  it('disables Process Text button when no text is entered', () => {
    renderComponent();
    expect(screen.getByTestId('process-text-button')).toBeDisabled();
  });

  it('enables Process Text button when text is entered', () => {
    renderComponent();
    const textarea = screen.getByTestId('textDialog-textarea');
    fireEvent.change(textarea, { target: { value: 'Test input' } });
    expect(screen.getByTestId('process-text-button')).not.toBeDisabled();
  });

  it('shows loading state when processing text', async () => {
    renderComponent();
    const textarea = screen.getByTestId('textDialog-textarea');
    fireEvent.change(textarea, { target: { value: 'Test input' } });
    fireEvent.click(screen.getByTestId('process-text-button'));

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByTestId('process-text-button')).toHaveTextContent('Generating...');
  });

  it('handles text processing completion', async () => {
    renderComponent();
    const textarea = screen.getByTestId('textDialog-textarea');
    fireEvent.change(textarea, { target: { value: 'Test input' } });
    fireEvent.click(screen.getByTestId('process-text-button'));

    // Simulate the message event for text processing completion
    await act(async () => {
      window.dispatchEvent(new MessageEvent('message', {
        data: {
          command: 'textDescriptionProcessed',
          description: 'UI Description',
          content: JSON.stringify({ some: 'content' }),
        },
      }));
    });

    expect(mockSetPages).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockCloseStartDialog).toHaveBeenCalled();
  });

});