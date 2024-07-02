import React from 'react';
import NavBar from '../NavBar';
import {
    Text,
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
    container: {
        gap: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: "20px",
        fontWeight: "600",
    }
});


interface Item {
    name: string;
    lastModified: string;
    created: string;
}


const items: Item[] = [
    {
        name: "Project 1",
        lastModified: "7h ago",
        created: "2d ago",
    },
    {
        name: "Project 2",
        lastModified: "1d ago",
        created: "3d ago",
    },
    {
        name: "Project 3",
        lastModified: "2d ago",
        created: "4d ago",
    }
];

const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
        columnId: "name",
        renderHeaderCell: () => {
            return "Name";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {item.name}
                </TableCellLayout>
            );
        },
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
        <div className={styles.container}>
            <NavBar />
            <div>
                <Text className={styles.text} as="h5">My Projects</Text>
                <DataGrid items={items} columns={columns} style={{ minWidth: "550px" }} getRowId={(item) => item.name}>
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
        </div>
    );
};

export default Projects;