import { Control, FieldError, FieldValues, Path } from "react-hook-form";
import {
  TextField,
  MenuItem,
  CircularProgress,
  TextFieldProps,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Option } from "@/features/issues/types.ts";

type AsyncSelectProps<T extends FieldValues> = {
  control?: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  isLoading?: boolean;
  error?: FieldError;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
};

// Переиспользуемый компонент на react-hook-form и Material UI,
// позволяет выбирать значение из списка опций, поддерживает асинхронную загрузку данных.

export const AsyncSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  isLoading = false,
  error,
  disabled = false,
  textFieldProps,
}: AsyncSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const currentOption = options.find((opt) => opt.value == field.value);

        return (
          <TextField
            {...field}
            {...textFieldProps}
            select
            label={label}
            fullWidth
            margin="normal"
            disabled={disabled || isLoading}
            error={!!error || isLoading}
            helperText={error?.message}
            value={currentOption?.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {isLoading ? (
              <MenuItem disabled value="">
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </TextField>
        );
      }}
    />
  );
};
