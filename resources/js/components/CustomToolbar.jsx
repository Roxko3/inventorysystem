import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter
                title="Keresés..."
                placeholder="Keresés..."
            />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarColumnsButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default CustomToolbar;
