import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StartProjectDialog } from '../../pages/EditingInterface/StartProjectDialog'; 
import { IntlProvider } from 'react-intl';
import English from '../../Features/languages/en.json';

// Mock the child components
jest.mock('../../Features/generateLayout/sketchUpload/UploadDialog', () => ({
  UploadDialog: () => <div data-testid="upload-dialog" />,
}));
jest.mock('../../Features/generateLayout/textUpload/TextUploadDialog', () => ({
  TextDialog: () => <div data-testid="text-dialog" />,
}));
jest.mock('../../pages/EditingInterface/TemplatesDialog', () => ({
  TemplatesDialog: () => <div data-testid="templates-dialog" />,
}));

describe('StartProjectDialog', () => {
  const mockOnClose = jest.fn();
  const mockSetPages = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    pages: [],
    setPages: mockSetPages,
  };

  const renderComponent = (props = {}) => {
    return render(
      <IntlProvider messages={English} locale="en">
        <StartProjectDialog {...defaultProps} {...props} />
      </IntlProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderComponent();
    expect(screen.getByTestId('startProjectDialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('startProjectDialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('from-scratch-button')).toBeInTheDocument();
    expect(screen.getByTestId('from-templates-button')).toBeInTheDocument();
    expect(screen.getByTestId('from-text-button')).toBeInTheDocument();
    expect(screen.getByTestId('from-sketch-button')).toBeInTheDocument();
  });


  it('calls setPages and onClose when clicking "Start from Scratch"', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('from-scratch-button'));
    expect(mockSetPages).toHaveBeenCalledWith([]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('opens TemplatesDialog when clicking "Choose from Templates"', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('from-templates-button'));
    expect(screen.getByTestId('templates-dialog')).toBeInTheDocument();
  });

  it('opens TextDialog when clicking "Start with Text"', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('from-text-button'));
    expect(screen.getByTestId('text-dialog')).toBeInTheDocument();
  });

  it('opens UploadDialog when clicking "Upload a Sketch"', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('from-sketch-button'));
    expect(screen.getByTestId('upload-dialog')).toBeInTheDocument();
  });
});