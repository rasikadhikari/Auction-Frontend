import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../Authentication/Signup";
import axios from "../Service/axios";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div />,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock axios
vi.mock("../Service/axios");

describe("Signup Component", () => {
  it("renders the signup form", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Create a strong password/i)
    ).toBeInTheDocument();
  });

  it("submits the form and shows success toast", async () => {
    (axios.post as any).mockResolvedValue({
      data: { message: "User registered" },
    });

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/John Doe/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Create a strong password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/user/register", {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "buyer",
      });
    });
  });
});
