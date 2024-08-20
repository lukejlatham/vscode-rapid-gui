import React from 'react';
import { 
    Button, 
    Listbox, 
    Option, 
    makeStyles, 
    SelectionEvents, 
    OptionOnSelectData,
    Breadcrumb,
    BreadcrumbItem,
    shorthands
} from '@fluentui/react-components';
import { RenamePageDialog } from '../../../components/RenamePageDialog';
import { DocumentAddRegular, DeleteRegular, SquareEraserRegular} from '@fluentui/react-icons';
import { Page } from '../../../types';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  pagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '200px', 
  },
  listbox: {
    maxHeight: '200px',
    overflowY: 'auto',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.borderRadius('4px'),
    width: '100%',
  },
  pageActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '10px',
  },
  breadcrumb: {
    marginBottom: '10px',
  }
});

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
}> = ({ 
    classes, 
    pages, 
    setPages, 
    renamePage, 
    deletePage, 
    clearPage, 
    updateCurrentPage, 
    currentPageIndex, 
    setCurrentPageIndex, 
    openAddPageDialog 
}) => {
    const styles = useStyles();
    const currentPage = pages[currentPageIndex];

    const handlePageSelect = (event: SelectionEvents, data: OptionOnSelectData) => {
        const newIndex = parseInt(data.selectedOptions[0]);
        if (newIndex !== currentPageIndex) {
            updateCurrentPage(); // Save current page before switching
            setCurrentPageIndex(newIndex);
        }
    };

    return (
        <div className={styles.pagesContainer}>
            <Breadcrumb className={styles.breadcrumb}>
                <BreadcrumbItem>Project Settings Page</BreadcrumbItem>
            </Breadcrumb>

            <Listbox 
                className={styles.listbox}
                selectedOptions={[currentPageIndex.toString()]}
                onOptionSelect={handlePageSelect}
            >
                {pages.map((page, index) => (
                    <Option key={page.id} value={index.toString()}>
                        {page.name}
                    </Option>
                ))}
            </Listbox>

            <div className={styles.pageActions}>
                <Button
                    icon={<DocumentAddRegular />}
                    onClick={() => {
                        updateCurrentPage(); // Save current page before adding new
                        openAddPageDialog();
                    }}
                >
                    <FormattedMessage id="pages.add" defaultMessage="Add"/>
                </Button>

                {currentPage && (
                    <>
                        <RenamePageDialog
                            onUpdate={updateCurrentPage}
                            currentPageName={currentPage.name}
                            onRename={(newName: string) => {
                                renamePage(currentPageIndex, newName);
                            }}
                        />
                        <Button
                            icon={<DeleteRegular />}
                            onClick={() => {
                                deletePage(currentPageIndex);
                            }}
                        >
                            <FormattedMessage id="pages.delete" defaultMessage="Delete"/>
                        </Button>
                        <Button
                            icon={<SquareEraserRegular />}
                            onClick={() => {
                                clearPage(currentPageIndex);
                            }}
                        >
                            <FormattedMessage id="pages.reset" defaultMessage="Reset"/>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PagesButtons;