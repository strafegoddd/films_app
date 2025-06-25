import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import Container from "@mui/material/Container";

type Movie = {
  film_id: number;
  film_name: string;
  film_rating: number;
  film_budget: number;
  genre: { genre_name: string };
  language: { language_name: string };
};

function BuildingsGrid() {
  const [films, setFilms] = useState<GridRowsProp>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/movies")
      .then((res) => res.json())
      .then((data) => {
        const movies = data.movies;
  
        const transformed = movies.map((b: Movie) => ({
          ...b,
          id: b.film_id,
          genre_name: b.genre.genre_name,
          language_name: b.language.language_name,
        }));
  
        setFilms(transformed);
      })
      .catch((err) => {
        console.error("Ошибка при получении фильмов:", err);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "film_name", headerName: "Название", flex: 1 },
    { field: "film_rating", headerName: "Рейтинг", flex: 0.5 },
    { field: "film_budget", headerName: "Бюджет", flex: 0.5 },
    {
      field: "genre_name",
      headerName: "Жанр",
      flex: 0.5,
    },
    {
      field: "language_name",
      headerName: "Язык",
      flex: 0.5,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: "700px", mt: "20px" }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={films}
        columns={columns}
        getRowId={(row) => row.id}
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

export default BuildingsGrid;
