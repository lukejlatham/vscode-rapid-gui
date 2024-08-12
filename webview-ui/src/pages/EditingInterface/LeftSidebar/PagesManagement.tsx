import React from 'react';
import { Button, Select } from '@fluentui/react-components';
import { RenamePageDialog } from '../../../components/RenamePageDialog';
import { DocumentAddRegular, DeleteRegular, SquareEraserRegular} from '@fluentui/react-icons';
import { Page } from '../../../types';

const PagesButtons: React.FC<{ 
    classes: any, 
    pages: Page[], 
    setPages: React.Dispatch<React.SetStateAction<Page[]>>, 
    currentPageIndex: number,
    setCurrentPageIndex: (index: number) => void;

    renamePage: (index: number, newName: string) => void;
    deletePage: (index: number) => void;
    clearPage: (index: number) => void;
    updateCurrentPage: () => void;
    openAddPageDialog: () => void;
}> = ({ classes, pages, setPages, renamePage, deletePage, clearPage, updateCurrentPage, currentPageIndex, setCurrentPageIndex, openAddPageDialog }) => {

    const currentPage = pages[currentPageIndex];

    return (
        <>
        {currentPage && (
            <div className={classes.componentRoot}>
                <Select
                    size='large'
                    value={currentPageIndex}
                    onChange={(e) => {
                        updateCurrentPage(); // Save current page before switching
                        setCurrentPageIndex(Number(e.target.value));
                    }}
                >
                    {pages.map((page, index) => (
                        <option key={page.id} value={index}>{page.name}</option>
                    ))}
                </Select>
                <Button
                    icon={<DocumentAddRegular />}
                    size='large'
                    onClick={() => {
                        updateCurrentPage(); // Save current page before adding new
                        openAddPageDialog();
                    }}
                >
                    Add
                </Button>
                <RenamePageDialog
                    onUpdate={updateCurrentPage}
                    currentPageName={currentPage.name}
                    onRename={(newName: string) => {
                        renamePage(currentPageIndex, newName);
                    }}
                />
                <Button
                    icon={<DeleteRegular />}
                    size='large'
                    onClick={() => {
                        deletePage(currentPageIndex);
                    }}
                >
                    Delete
                </Button>
                <Button
                    size='large'
                    icon={<SquareEraserRegular />}
                    onClick={() => {
                        clearPage(currentPageIndex);
                    }}
                >
                    Reset
                </Button>
            </div>
        )}
        </>
    );
}

export default PagesButtons;