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
                debounceMs={500}
            />
            <GridToolbarDensitySelector />
            <GridToolbarColumnsButton />
        </GridToolbarContainer>
    );
}

export default CustomToolbar;
