import { SimpleTable, type Theme, type CellChangeProps } from "simple-table-core";
import { HEADERS } from "./hr-headers";
import { useState } from "react";
import "simple-table-core/styles.css";
import HR_DATA from "./hr-data.json";

export default function Table({
                                      height = 500,
                                      rowHeight = 48,
                                      theme,
                                  }: {
    height: number | null;
    rowHeight?: number;
    theme?: Theme;
}) {
    const [data, setData] = useState(HR_DATA);

    const howManyRowsCanFit = height ? Math.floor(height / rowHeight) : 10;

    const handleCellEdit = ({ accessor, newValue, row }: CellChangeProps) => {
        setData((prevData) =>
            prevData.map((item) => {
                if (item.id === row.id) {
                    return {
                        ...item,
                        [accessor]: newValue,
                    };
                }
                return item;
            })
        );
    };

    return (
        <div style={{ display: "flex" }}>
            <SimpleTable
                columnReordering
                columnResizing
                defaultHeaders={HEADERS}
                rowIdAccessor="id"
                rows={data}
                rowsPerPage={howManyRowsCanFit}
                rowHeight={rowHeight}
                selectableCells
                shouldPaginate
                theme={theme}
                onCellEdit={handleCellEdit}
            />
        </div>
    );
}
