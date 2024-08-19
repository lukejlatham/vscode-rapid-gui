import React from 'react';
import { Button, Divider } from '@fluentui/react-components';
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

   {pages.map((page, index) => (
          <Button
            key={page.id}
            appearance={index === currentPageIndex ? 'primary' : 'secondary'}
            onClick={() => {
              updateCurrentPage(); // Save current page before switching
              setCurrentPageIndex(index);
            }}
          >
            {page.name}
          </Button>
        ))}
        <Button
          icon={<DocumentAddRegular />}
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