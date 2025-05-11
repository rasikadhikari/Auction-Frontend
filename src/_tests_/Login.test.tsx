import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Authentication/Login";
import axios from "../Service/axios";
import { toast } from "react-toastify";

// Mocking toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div />,
}));

// Mocking react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock axios
vi.mock("../Service/axios");

describe("Login Component", () => {
  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();
  });

  it("submits the form and shows success toast", async () => {
    // Mocking a valid response with a correctly formatted token
    (axios.post as any).mockResolvedValue({
      data: {
        token: "validToken.part2.part3", // Mock a valid JWT token format
        user: { id: "1", role: "buyer", email: "test@example.com" },
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulating user input
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Wait for axios to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/user/login", {
        email: "test@example.com",
        password: "password123",
        role: "buyer",
      });
    });
  });

  it("handles login error and shows error toast", async () => {
    // Mocking an error response
    (axios.post as any).mockRejectedValue({
      response: {
        data: { message: "Invalid credentials" },
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulating incorrect login
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "wrongpassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Ensure axios is called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/user/login", {
        email: "wrong@example.com",
        password: "wrongpassword",
        role: "buyer",
      });
    });

    // Ensure toast.error is called with the correct error message
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
