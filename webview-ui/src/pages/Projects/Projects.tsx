import React from 'react';
import {
    Body2,
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    makeStyles
} from '@fluentui/react-components';


const useStyles = makeStyles({
    text: {
        fontSize: "20px",
        fontWeight: "600",
    },
    container: {
        minWidth: "100px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "15px",
    },
    dataGrid: {
        margin: '0 auto',
        height: '100%',
        width: '100%',
    },
});


interface Item {
    name: string;
    lastModified: string;
    created: string;
    font: string;
}


const items: Item[] = [
    {
        name: "Project 1",
        lastModified: "7h ago",
        created: "2d ago",
        font: "Segoe UI",
    },
    {
        name: "Project 2",
        lastModified: "1d ago",
        created: "3d ago",
        font: "Segoe UI",
    },
    {
        name: "Project 3",
        lastModified: "2d ago",
        created: "4d ago",
        font: "Segoe UI",
    }
];

const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
        columnId: 'name',
        renderHeaderCell: () => 'Name',
        renderCell: (item) => (
          <TableCellLayout>
            {item.name}
          </TableCellLayout>
        ),
      }),
    createTableColumn<Item>({
        columnId: "lastModified",
        renderHeaderCell: () => {
            return "Last Modified";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {item.lastModified}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<Item>({
        columnId: "created",
        renderHeaderCell: () => {
            return "Created";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {item.created}
                </TableCellLayout>
            );
        },
    }),
];


const Projects: React.FC = () => {
    const styles = useStyles();
    return (
        <>
        <Body2>My Projects</Body2>
        <div className={styles.container}>
            <DataGrid className={styles.dataGrid} items={items} columns={columns} getRowId={(item) => item.name}>
                <DataGridHeader>
                    <DataGridRow
                    >
                        {({ renderHeaderCell }) => (
                            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<Item>>
                    {({ item, rowId }) => (
                        <DataGridRow<Item>
                            key={rowId}
                        >
                            {({ renderCell }) => (
                                <DataGridCell>{renderCell(item)}</DataGridCell>
                            )}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGrid>
        </div>
        </>
    );
};

export default Projects;