import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tGroup } from "../groupdata";
import Container from "@mui/material/Container";

type GroupProps = {
  data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const columns: GridColDef[] = [
    { field: "Группа", headerName: "Группа", flex: 1 },
    {
      field: "Минимальный рейтинг",
      headerName: "Минимальный рейтинг",
      flex: 1,
      type: "number",
    },
    {
      field: "Максимальный рейтинг",
      headerName: "Максимальный рейтинг",
      flex: 1,
      type: "number",
    },
    {
      field: "Средний рейтинг",
      headerName: "Средний рейтинг",
      flex: 1,
      type: "number",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: "720px", mt: "20px" }}>
      <DataGrid
        rows={data}
        columns={columns}
        showToolbar={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Container>
  );
}

export default GroupGrid;
