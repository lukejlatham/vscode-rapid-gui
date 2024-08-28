import { render, screen } from '@testing-library/react';
import { Editor } from '@craftjs/core';
import { IntlProvider } from 'react-intl';
import ComponentButtons from '../../../pages/EditingInterface/LeftSidebar/ComponentsTab/ComponentButtons';

jest.mock('@craftjs/core', () => ({
    Editor: ({ children }: { children: React.ReactNode}) => <div>{children}</div>,
    useEditor: () => ({
      connectors: {
        create: jest.fn(),
      },
    }),
    Element: ({ 
        is,
        idString,
        canvas,
        customRecord,
        hidden,
        ...elementProps
        }: {
        is: React.ElementType,
        idString?: string,
        canvas?: boolean,
        customRecord?: Record<string, any>,
        hidden?: boolean,
        }) => <div {...elementProps} />,
  }));
const renderComponent = () => {
  return render(
    <IntlProvider locale="en" messages={{}}>
      <Editor>
        <ComponentButtons />
      </Editor>
    </IntlProvider>
  );
};

describe('ComponentButtons', () => {

// unit tests:
  test('renders the Components heading', () => {
    renderComponent();
    expect(screen.getByTestId('button-button')).toBeInTheDocument();
    expect(screen.getByTestId('button-label')).toBeInTheDocument();
    expect(screen.getByTestId('button-input')).toBeInTheDocument();
    expect(screen.getByTestId('button-textbox')).toBeInTheDocument();
    expect(screen.getByTestId('button-text')).toBeInTheDocument();
    expect(screen.getByTestId('button-image')).toBeInTheDocument();
    expect(screen.getByTestId('button-radio')).toBeInTheDocument();
    expect(screen.getByTestId('button-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('button-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('button-slider')).toBeInTheDocument();
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
    expect(screen.getByTestId('button-container')).toBeInTheDocument();
  });

});