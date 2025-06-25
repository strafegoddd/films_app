import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type tSeries = {
  "Максимальный рейтинг": boolean;
  "Средний рейтинг": boolean;
  "Минимальный рейтинг": boolean;
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
};

function SettingChart({ series, setSeries }: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl>
      <FormLabel id="label-checkbox-group">На диаграмме показать:</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={series["Максимальный рейтинг"]}
            name="Максимальный рейтинг"
            onChange={handleChange}
          />
        }
        label="максимальный рейтинг"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={series["Средний рейтинг"]}
            name="Средний рейтинг"
            onChange={handleChange}
          />
        }
        label="средний рейтинг"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={series["Минимальный рейтинг"]}
            name="Минимальный рейтинг"
            onChange={handleChange}
          />
        }
        label="Минимальный рейтинг"
      />
    </FormControl>
  );
}
export default SettingChart;
