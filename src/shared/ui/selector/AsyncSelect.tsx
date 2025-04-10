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
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  isLoading?: boolean;
  error?: FieldError;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
};

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
      render={({ field }) => (
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
          value={isLoading ? "" : field.value} // Чтобы избежать предупреждений MUI
        >
          {isLoading ? (
            <MenuItem disabled>
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
      )}
    />
  );
};
