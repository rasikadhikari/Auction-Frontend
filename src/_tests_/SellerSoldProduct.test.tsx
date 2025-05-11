import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SellerDetail from "../Seller-page/SellerProduct";
import { vi } from "vitest";
import axios from "../Service/axios";
import { BrowserRouter as Router } from "react-router-dom";
import * as toastify from "react-toastify";

// Mock axios and toast
vi.mock("../Service/axios");
vi.mock("react-toastify", async () => {
  const original = await vi.importActual<typeof toastify>("react-toastify");
  return {
    ...original,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe("SellerDetail Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product list and fetches products", async () => {
    (axios.get as any).mockResolvedValueOnce({
      data: {
        products: [
          {
            _id: "1",
            title: "Product 1",
            commission: "10%",
            price: 100,
            bidAmount: 50,
            image: "/path/to/image.jpg",
            isVerify: true,
            isSoldout: false,
            isArchived: false,
          },
        ],
      },
    });

    render(
      <Router>
        <SellerDetail />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("10%")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("50")).toBeInTheDocument();
    });
  });

  it("handles sell product action", async () => {
    (axios.get as any).mockResolvedValueOnce({
      data: {
        products: [
          {
            _id: "1",
            title: "Product 1",
            commission: "10%",
            price: 100,
            bidAmount: 50,
            image: "/path.jpg",
            isVerify: true,
            isSoldout: false,
            isArchived: false,
          },
        ],
      },
    });

    (axios.post as any).mockResolvedValueOnce({
      data: { message: "Product sold successfully!" },
    });

    render(
      <Router>
        <SellerDetail />
      </Router>
    );

    const sellButton = await screen.findByText("Sell");
    fireEvent.click(sellButton);

    await waitFor(() => {
      expect(toastify.toast.success).toHaveBeenCalledWith(
        "Product sold successfully!"
      );
    });
  });

  it("handles delete product action", async () => {
    window.confirm = vi.fn(() => true); // always confirm delete

    (axios.get as any).mockResolvedValueOnce({
      data: {
        products: [
          {
            _id: "1",
            title: "Product 1",
            commission: "10%",
            price: 100,
            bidAmount: 50,
            image: "/path.jpg",
            isVerify: true,
            isSoldout: false,
            isArchived: false,
          },
        ],
      },
    });

    (axios.delete as any).mockResolvedValueOnce({});

    render(
      <Router>
        <SellerDetail />
      </Router>
    );

    const deleteIcon = await screen.findByTitle("Delete");
    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(toastify.toast.success).toHaveBeenCalledWith(
        "Product deleted successfully!"
      );
    });
  });

  it("handles archive/unarchive product action", async () => {
    (axios.get as any).mockResolvedValueOnce({
      data: {
        products: [
          {
            _id: "1",
            title: "Product 1",
            commission: "10%",
            price: 100,
            bidAmount: 50,
            image: "/path.jpg",
            isVerify: true,
            isSoldout: false,
            isArchived: false,
          },
        ],
      },
    });

    (axios.patch as any).mockResolvedValueOnce({});

    render(
      <Router>
        <SellerDetail />
      </Router>
    );

    const archiveButton = await screen.findByTitle("Archive");
    fireEvent.click(archiveButton);

    await waitFor(() => {
      expect(toastify.toast.success).toHaveBeenCalledWith(
        "Product archived/unarchived successfully!"
      );
    });
  });

  it("handles failed delete request", async () => {
    window.confirm = vi.fn(() => true);

    (axios.get as any).mockResolvedValueOnce({
      data: {
        products: [
          {
            _id: "1",
            title: "Product 1",
            commission: "10%",
            price: 100,
            bidAmount: 50,
            image: "/path.jpg",
            isVerify: true,
            isSoldout: false,
            isArchived: false,
          },
        ],
      },
    });

    (axios.delete as any).mockRejectedValueOnce({
      response: {
        data: {
          message: "Delete failed",
        },
      },
    });

    render(
      <Router>
        <SellerDetail />
      </Router>
    );

    const deleteIcon = await screen.findByTitle("Delete");
    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(toastify.toast.error).toHaveBeenCalledWith("Delete failed");
    });
  });
});
