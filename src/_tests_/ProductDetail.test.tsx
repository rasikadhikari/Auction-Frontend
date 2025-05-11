import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetail from "../User-pages/ProductDetail";
import { vi } from "vitest";
import axios from "../Service/axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock axios
vi.mock("../Service/axios");

describe("ProductDetail", () => {
  const mockProduct = {
    _id: "1",
    title: "Test Product",
    image: "/test.jpg",
    price: 100,
    description: "A test product",
    isSoldout: false,
    isVerify: true,
    category: { title: "Test Category" },
  };

  const mockBids = [
    {
      _id: "b1",
      bidAmount: 110,
      createdAt: new Date().toISOString(),
      buyer: { name: "John Doe" },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.setItem("token", "test-token");

    (axios.get as any).mockImplementation((url: string) => {
      if (url.includes("/product/"))
        return Promise.resolve({ data: { product: mockProduct } });
      if (url.includes("/wishlist"))
        return Promise.resolve({ data: { wishlist: [] } });
      if (url.includes("/bid/"))
        return Promise.resolve({ data: { bids: mockBids } });
    });
  });

  function renderWithRouter() {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("renders product details after loading", async () => {
    renderWithRouter();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => screen.getByText("Test Product"));

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("Current Price: $100")).toBeInTheDocument();
  });

  it("places a bid", async () => {
    (axios.post as any).mockResolvedValueOnce({}); // for placing a bid

    renderWithRouter();

    await waitFor(() => screen.getByText("Bid"));

    const input = screen.getByPlaceholderText("Enter your bid amount");
    fireEvent.change(input, { target: { value: "120" } });

    const button = screen.getByText("Bid");
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/bid/place/1",
        { bidAmount: "120" },
        expect.anything()
      );
    });
  });

  it("toggles wishlist (add)", async () => {
    (axios.post as any).mockResolvedValueOnce({});

    renderWithRouter();

    // Wait for wishlist button to appear and click it
    const heartButton = await screen.findByLabelText("Toggle Wishlist");
    fireEvent.click(heartButton);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "/wishlist/add",
        { productId: "1" },
        expect.anything()
      )
    );
  });

  it("shows bid history", async () => {
    renderWithRouter();

    await waitFor(() => screen.getByText(/Show Bid History/));
    fireEvent.click(screen.getByText(/Show Bid History/));

    expect(await screen.findByText(/1. John Doe/)).toBeInTheDocument();
    expect(screen.getByText("$110")).toBeInTheDocument();
  });

  it("handles missing product", async () => {
    (axios.get as any).mockImplementationOnce(() => Promise.reject());

    renderWithRouter();

    await waitFor(() => screen.getByText("Product not found"));
  });
});
