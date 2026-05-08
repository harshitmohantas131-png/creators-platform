import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm interaction tests", () => {
  test("typing test updates email and password fields", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Secret123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("Secret123");
  });

  test("happy path submission calls onSubmit once with credentials", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Secret123");
    await user.click(button);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "Secret123",
    });
  });

  test("validation failure shows alert and does not submit when fields are empty", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    const button = screen.getByRole("button", { name: /login/i });
    await user.click(button);

    const alert = await screen.findByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});


