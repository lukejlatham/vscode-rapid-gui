import React from 'react';
import { Button, Select } from '@fluentui/react-components';
import { RenamePageDialog } from '../../../components/RenamePageDialog';
import { DocumentAddRegular, DeleteRegular, SquareEraserRegular} from '@fluentui/react-icons';
import { Page } from '../../../types';
import { FormattedMessage } from 'react-intl';

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
                    size='medium'
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
                    size='medium'
                    onClick={() => {
                        updateCurrentPage(); // Save current page before adding new
                        openAddPageDialog();
                    }}
                >
                    <FormattedMessage id="pages.add" defaultMessage="Add"/>
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
                    size='medium'
                    onClick={() => {
                        deletePage(currentPageIndex);
                    }}
                >
                    <FormattedMessage id="pages.delete" defaultMessage="Delete"/>
                </Button>
                <Button
                    size='medium'
                    icon={<SquareEraserRegular />}
                    onClick={() => {
                        clearPage(currentPageIndex);
                    }}
                >
                    <FormattedMessage id="pages.reset" defaultMessage="Reset"/>
                </Button>
            </div>
        )}
        </>
    );
}

export default PagesButtons;