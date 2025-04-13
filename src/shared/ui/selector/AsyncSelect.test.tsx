import { render, screen } from "@testing-library/react";
import { AsyncSelect } from "./AsyncSelect";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";

const mockOptions = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
];

describe("AsyncSelect", () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it("should display options when loaded", async () => {
    render(
      <Wrapper>
        <Controller
          name="test"
          render={({ field }) => (
            <AsyncSelect label="Test" options={mockOptions} {...field} />
          )}
        />
      </Wrapper>,
    );

    await userEvent.click(screen.getByRole("combobox", { name: "Test" }));

    expect(await screen.findByText("Option 1")).toBeInTheDocument();
    expect(await screen.findByText("Option 2")).toBeInTheDocument();
  });
});
