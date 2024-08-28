import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LeftSidebar from '../../../pages/EditingInterface/LeftSidebar/LeftSidebar';
import { IntlProvider } from 'react-intl';
import { AccessibilityContext } from '../../../pages/EditingInterface/EditingInterface';


// mock the Editor component
jest.mock('@craftjs/core', () => ({
    Editor: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useEditor: () => ({
      actions: {
        setProp: jest.fn(),
      },
    }),
  }));

// Mock the child components
jest.mock('../../../pages/EditingInterface/LeftSidebar/ComponentsTab/ComponentButtons', () => () => <div data-testid="mock-component-buttons" />);
jest.mock('../../../pages/EditingInterface/LeftSidebar/ProjectManagementButtons/ProjectManagementButtons', () => () => <div data-testid="mock-project-management" />);
jest.mock('../../../pages/EditingInterface/LeftSidebar/LayoutTab/LayoutTab', () => () => <div data-testid="mock-layout-management" />);
jest.mock('../../../pages/EditingInterface/LeftSidebar/PagesTab/PagesButtons', () => () => <div data-testid="mock-pages-buttons" />);
jest.mock('../../../pages/EditingInterface/LeftSidebar/SettingsTab/Settings', () => () => <div data-testid="mock-settings" />);
jest.mock('../../../Features/theming/ThemingDropdowns', () => () => <div data-testid="mock-theming-dropdowns" />);
jest.mock('../../../pages/EditingInterface/LeftSidebar/ProjectManagementButtons/RestartDialog', () => () => <div data-testid="restart-dialog" />);

describe('LeftSidebar', () => {
  const mockProps = {
    classes: {},
    pages: [],
    setPages: jest.fn(),
    currentPageIndex: 0,
    setCurrentPageIndex: jest.fn(),
    renamePage: jest.fn(),
    deletePage: jest.fn(),
    clearPage: jest.fn(),
    updateCurrentPage: jest.fn(),
    openStartProjectDialog: jest.fn(),
    openAddPageDialog: jest.fn(),
    theme: {} as any,
    setTheme: jest.fn(),
  };

  const renderComponent = (accessibilityValue: 'no' | 'yes' = 'no') => {
    return render(
      <IntlProvider messages={{}} locale="en">
        <AccessibilityContext.Provider value={{ selectedAccessibility: accessibilityValue, setSelectedAccessibility: jest.fn() }}>
            <LeftSidebar {...mockProps} />
        </AccessibilityContext.Provider>
      </IntlProvider>
    );
  };

  it('renders the LeftSidebar component', () => {
    renderComponent();
    expect(screen.getByTestId('left-sidebar')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    renderComponent();
    expect(screen.getByTestId('layout-tab')).toBeInTheDocument();
    expect(screen.getByTestId('components-tab')).toBeInTheDocument();
    expect(screen.getByTestId('pages-tab')).toBeInTheDocument();
    expect(screen.getByTestId('settings-tab')).toBeInTheDocument();
  });

  it('renders utility buttons', () => {
    renderComponent();
    expect(screen.getByTestId('utility-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('restart-dialog-button')).toBeInTheDocument();
  });

  it('opens restart dialog when clicking the restart button', async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('restart-dialog-button'));

      expect(screen.getByTestId('restart-dialog')).toBeInTheDocument();
  
  });

  it('renders content when a tab is selected', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('layout-tab'));
    expect(screen.getByTestId('mock-layout-management')).toBeInTheDocument();
  });

  it('toggles content visibility when clicking the same tab twice', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('layout-tab'));
    expect(screen.getByTestId('mock-layout-management')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('layout-tab'));
    expect(screen.queryByTestId('mock-layout-management')).not.toBeInTheDocument();
  });


});