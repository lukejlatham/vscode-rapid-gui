import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PropertyInspector from "../../../pages/EditingInterface/RightSidebar/PropertyInspector";
import { useEditor } from "@craftjs/core";
import { IntlProvider } from "react-intl";
import English from "../../../Features/languages/en.json";

// Mock useEditor hook
jest.mock('@craftjs/core', () => ({
    useEditor: jest.fn(),
}));


describe('PropertyInspector', () => {
    const mockActions = {
      setProp: jest.fn(),
      delete: jest.fn(),
      clearEvents: jest.fn(),
    };

    const renderComponent = (
        classes: any = {},
        props = {}
    ) => {
        return render(
            <IntlProvider messages={English} locale="en">
                <PropertyInspector classes={classes} {...props} />
            </IntlProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useEditor as jest.Mock).mockReturnValue({
            selected: {
                id: 'test-id',
                displayName: 'Test Component',
                props: { color: 'red' },
                isDeletable: true,
            },
            actions: mockActions,
        });
    });

    it('renders without crashing', () => {
        renderComponent({ rightSidebar: 'test-class' });
        expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('copies settings when copy button is clicked', () => {
        renderComponent({ rightSidebar: 'test-class' });
        const copyButton = screen.getByRole('button', { name: /Copy Format/i });
        fireEvent.click(copyButton);
        expect(mockActions.setProp).not.toHaveBeenCalled();
    });

    it('deletes component when delete button is clicked', () => {
        renderComponent({ rightSidebar: 'test-class' });
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButton);
        expect(mockActions.delete).toHaveBeenCalledWith('test-id');
    });

    it('renders component details when a component is selected', () => {
        renderComponent({ rightSidebar: 'test-class' });
        expect(screen.getByText(/Test Component/i)).toBeInTheDocument();
    });

    it('handles copy and paste actions correctly', () => {
        renderComponent({ rightSidebar: 'test-class' });

        const copyButton = screen.getByRole('button', { name: /Copy Format/i });
        fireEvent.click(copyButton);
        expect(mockActions.setProp).not.toHaveBeenCalled();

        const pasteButton = screen.getByRole('button', { name: /Paste Format/i });
        fireEvent.click(pasteButton);

        expect(mockActions.setProp).toHaveBeenCalledWith('test-id', expect.any(Function));
    });

    it('does not render when no component is selected', () => {
        (useEditor as jest.Mock).mockReturnValue({
            selected: null,
            actions: mockActions,
        });

        renderComponent({ rightSidebar: 'test-class' });
        expect(screen.queryByTestId('property-inspector')).not.toBeInTheDocument();
    });

    it('does not render when closed', () => {
        renderComponent({ rightSidebar: 'test-class' });
        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);

        expect(mockActions.clearEvents).toHaveBeenCalled();
    });

});