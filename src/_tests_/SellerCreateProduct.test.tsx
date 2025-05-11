import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SellerCreateProduct from "../Seller-page/CreateProduct";
import axios from "../Service/axios";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div />,
}));

vi.mock("../Service/axios");

vi.mock("../components/SellerSidebar", () => ({
  default: () => <div>SellerSidebar</div>,
}));

// Mocking URL.createObjectURL for tests
global.URL.createObjectURL = vi.fn().mockReturnValue("mocked-url");

describe("SellerCreateProduct Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the create product form", () => {
    render(
      <BrowserRouter>
        <SellerCreateProduct />
      </BrowserRouter>
    );

    expect(screen.getByText(/🎨 Seller Create Product/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Product Title/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Product Description/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Select Category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Submit Product/i })
    ).toBeInTheDocument();
  });

  it("handles image upload and shows preview", async () => {
    render(
      <BrowserRouter>
        <SellerCreateProduct />
      </BrowserRouter>
    );

    const file = new File(["test"], "test.png", { type: "image/png" });

    const fileInput = screen.getByLabelText(
      /Upload Image/i
    ) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByAltText(/Preview/i);
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute("src", "mocked-url");
    });
  });

  it("submits the form with product data", async () => {
    const mockCategories = [
      { _id: "1", title: "Paintings" },
      { _id: "2", title: "Sculptures" },
    ];

    (axios.get as any).mockResolvedValue({
      data: { category: mockCategories },
    });

    (axios.post as any).mockResolvedValue({
      data: { message: "Product created successfully!" },
    });

    render(
      <BrowserRouter>
        <SellerCreateProduct />
      </BrowserRouter>
    );

    await screen.findByText(mockCategories[0].title);

    fireEvent.change(screen.getByPlaceholderText(/Product Title/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Product Description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByDisplayValue(/Select Category/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Price/i), {
      target: { value: "100" },
    });

    const file = new File(["test"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(
      /Upload Image/i
    ) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /Submit Product/i }));
  });
});
