import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { ImageImageUploadDialog } from '../../Features/generateLayout/sketchUpload/ImageImageUploadDialog';
import { IntlProvider } from 'react-intl';
import English from '../../Features/languages/en.json';

// Mock the handleSketchUpload function
jest.mock('../../Features/generateLayout/sketchUpload/handleSketchUpload', () => ({
  handleSketchUpload: jest.fn(),
}));

describe('ImageImageUploadDialog', () => {
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
        <ImageImageUploadDialog {...defaultProps} {...props} />
      </IntlProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderComponent();
    expect(screen.getByTestId('ImageUploadDialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('no-image-text')).toBeInTheDocument();
    expect(screen.getByTestId('ImageUploadDialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('upload-image-button')).toBeInTheDocument();

    expect(screen.getByTestId('process-sketch-button')).toBeInTheDocument();
    expect(screen.getByTestId('process-sketch-button')).toBeDisabled();

    expect(screen.queryByTestId('image-uploaded-text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('image-uploaded-weight')).not.toBeInTheDocument();

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderComponent({ isOpen: false });
    expect(screen.queryByTestId('ImageUploadDialog-title')).not.toBeInTheDocument();
  });

  it('allows image upload', () => {
    renderComponent();
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const input = screen.getByTestId('image-input');
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByTestId('image-uploaded-text')).toBeInTheDocument();
    expect(screen.getByTestId('image-uploaded-weight')).toBeInTheDocument();
    expect(screen.getByText('Change Image')).toBeInTheDocument();
  });

  it('disables Process Sketch button when no image is selected', () => {
    renderComponent();
    expect(screen.getByTestId('process-sketch-button')).toBeDisabled();
  });

  it('enables Process Sketch button when an image is selected', () => {
    renderComponent();
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const input = screen.getByTestId('image-input');
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByTestId('process-sketch-button')).not.toBeDisabled();
  });

  it('shows loading state when processing sketch', async () => {
    renderComponent();
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const input = screen.getByTestId('image-input');
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByTestId('process-sketch-button'));

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('handles sketch processing completion', async () => {
    renderComponent();
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const input = screen.getByTestId('image-input');

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByTestId('process-sketch-button'));

    // Simulate the message event for sketch processing completion
    await waitFor(() => {
        window.dispatchEvent(new MessageEvent('message', {
            data: {
            command: 'sketchProcessed',
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