import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { EditorContent, EditorContentProps } from '../../pages/EditingInterface/EditorContent';
import { Editor } from '@craftjs/core';
import { IntlProvider } from 'react-intl';
import English from '../../Features/languages/en.json';

// Mock the necessary components and hooks
const mockDeserialize = jest.fn();


jest.mock('@craftjs/core', () => ({
    Editor: ({ children }: { children: React.ReactNode }) => <div data-testid="craft-editor">{children}</div>,
    useEditor: () => ({
        actions: {
            deserialize: mockDeserialize,
        },
        query: {
            serialize: jest.fn(() => JSON.stringify({ test: 'serialized' })),
        },
    }),
}));

jest.mock('../../pages/EditingInterface/LeftSidebar/LeftSidebar', () => ({
    __esModule: true,
    default: () => <div data-testid="left-sidebar" />,
}));

jest.mock('../../pages/EditingInterface/Canvas', () => ({
    __esModule: true,
    default: () => <div data-testid="canvas" />,
}));

jest.mock('../../pages/EditingInterface/RightSidebar/PropertyInspector', () => ({
    __esModule: true,
    default: () => <div data-testid="property-inspector" />,
}));

const mockPages = [
    {
        id: '1', name: 'Page 1', content: {
            ROOT: {
                type: { resolvedName: 'Background' },
                isCanvas: true,
                props: {},
                displayName: 'Background',
                custom: {},
                hidden: false,
                nodes: [],
                linkedNodes: {},
                parent: null,
            },
        }
    },
    {
        id: '2', name: 'Page 2', content: {
            ROOT: {
                type: { resolvedName: 'Background' },
                isCanvas: true,
                props: {},
                displayName: 'Background',
                custom: {},
                hidden: false,
                nodes: [],
                linkedNodes: {},
                parent: null,
            }
        }
    },
];

const mockProps: EditorContentProps = {
    pages: mockPages,
    currentPageIndex: 0,
    setCurrentPageIndex: jest.fn(),
    addPage: jest.fn(),
    renamePage: jest.fn(),
    deletePage: jest.fn(),
    setPages: jest.fn(),
    resetPage: jest.fn(),
    classes: {
        mainLayout: 'main-layout-class',
        mainContent: 'main-content-class',
    },
    theme: {} as any,
    setTheme: jest.fn(),
};

const renderEditorContent = (props = mockProps) => {
    return render(
        // <FluentProvider theme={props.theme}>
        <IntlProvider messages={English} locale="en">
            <Editor resolver={{}}>
                <EditorContent {...props} />
            </Editor>
        </IntlProvider>
    );
};

describe('EditorContent', () => {
    it('renders without crashing', () => {
        renderEditorContent();
        expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    it('renders LeftSidebar, Canvas, and PropertyInspector', () => {
        renderEditorContent();
        expect(screen.getByTestId('left-sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('canvas')).toBeInTheDocument();
        expect(screen.getByTestId('property-inspector')).toBeInTheDocument();
    });

    it('initializes with StartProjectDialog open', () => {
        renderEditorContent();
        expect(screen.getByTestId('startProjectDialog-title')).toBeInTheDocument();
    });

    it('deserializes content when currentPageIndex changes', async () => {
        const { rerender } = renderEditorContent();

        // Initially, it should deserialize the first page's content
        await waitFor(() => {
            expect(mockDeserialize).toHaveBeenCalledWith(JSON.stringify(mockPages[0].content));
        });

        mockDeserialize.mockClear(); // Clear the previous calls

        // Change the currentPageIndex
        const newProps = { ...mockProps, currentPageIndex: 1 };

        rerender(
            <IntlProvider messages={English} locale="en">
                <Editor resolver={{}}>
                    <EditorContent {...newProps} />
                </Editor>
            </IntlProvider>
        );

        // Now it should deserialize the second page's content
        await waitFor(() => {
            expect(mockDeserialize).toHaveBeenCalledWith(JSON.stringify(mockPages[1].content));
        });
    });


});