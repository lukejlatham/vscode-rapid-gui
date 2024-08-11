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
    addPage: () => void;
    renamePage: (index: number, newName: string) => void;
    deletePage: (index: number) => void;
    clearPage: (index: number) => void;
    updateCurrentPage: () => void;
}> = ({ classes, pages, setPages, addPage, renamePage, deletePage, clearPage, updateCurrentPage, currentPageIndex, setCurrentPageIndex }) => {


    return (
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
                            addPage();
                        }}
                    >
                        Add
                    </Button>
                    <RenamePageDialog
                        onUpdate={updateCurrentPage}
                        currentPageName={pages[currentPageIndex].name}
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
    );
}

export default PagesButtons;