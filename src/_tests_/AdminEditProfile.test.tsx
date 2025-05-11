import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminEditProfile from "../Admin-Pages/AdminProfile";
import axios from "../Service/axios";
import { toast } from "react-toastify";

// Mocking dependencies
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div />,
}));

vi.mock("../Service/axios");

// Mock AdminSidebar component with proper default export
vi.mock("../components/AdminSidebar", () => ({
  default: () => <div>AdminSidebar</div>,
}));

// Mock default profile image with proper default export
vi.mock("../Images/Default.png", () => ({
  default: "default-profile-image-url",
}));

// Mock URL.createObjectURL which is not available in the test environment
global.URL.createObjectURL = vi.fn(() => "blob:mock-url");

describe("AdminEditProfile Component", () => {
  const mockProfileData = {
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    photo: "/uploads/profile.jpg",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Storage.prototype.getItem = vi.fn(() => "mock-token");

    // Reset the URL.createObjectURL mock for each test
    (URL.createObjectURL as any).mockImplementation(() => "blob:mock-url");
  });

  // Create a wrapped render function
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AdminEditProfile />
      </BrowserRouter>
    );
  };

  it("renders the edit profile form with initial data", async () => {
    (axios.get as any).mockResolvedValue({ data: mockProfileData });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Edit Admin Profile/i)).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue(mockProfileData.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProfileData.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProfileData.role)).toBeInTheDocument();

    const profileImage = screen.getByAltText("Admin Profile");
    // The image src should be from the server since we haven't changed it yet
    expect(profileImage).toHaveAttribute(
      "src",
      `http://localhost:4000${mockProfileData.photo}`
    );
  });

  it("handles profile fetch error", async () => {
    (axios.get as any).mockRejectedValue(new Error("Fetch failed"));

    renderComponent();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to load admin profile.");
    });
  });

  it("updates name field correctly", async () => {
    (axios.get as any).mockResolvedValue({ data: mockProfileData });

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(mockProfileData.name)
      ).toBeInTheDocument();
    });

    const nameInput = screen.getByDisplayValue(mockProfileData.name);
    fireEvent.change(nameInput, { target: { value: "New Admin Name" } });

    expect(nameInput).toHaveValue("New Admin Name");
  });

  it("handles profile image change", async () => {
    (axios.get as any).mockResolvedValue({ data: mockProfileData });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Edit Admin Profile/i)).toBeInTheDocument();
    });

    const file = new File(["test"], "profile.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(/Choose profile photo/i);

    // Trigger file selection
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check that our URL.createObjectURL was called with the file
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);

    await waitFor(() => {
      const profileImage = screen.getByAltText("Admin Profile");
      expect(profileImage).toHaveAttribute("src", "blob:mock-url");
    });
  });

  it("submits the form with updated data successfully", async () => {
    (axios.get as any).mockResolvedValue({ data: mockProfileData });
    (axios.put as any).mockResolvedValue({
      data: {
        user: {
          ...mockProfileData,
          name: "Updated Name",
          photo: "/uploads/new-profile.jpg",
        },
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(mockProfileData.name)
      ).toBeInTheDocument();
    });

    const nameInput = screen.getByDisplayValue(mockProfileData.name);
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    fireEvent.click(screen.getByRole("button", { name: /Update Profile/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "/user/admin/update-profile",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer mock-token",
          },
        }
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Profile updated successfully!");
  });

  it("handles form submission error", async () => {
    (axios.get as any).mockResolvedValue({ data: mockProfileData });
    (axios.put as any).mockRejectedValue(new Error("Update failed"));

    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(mockProfileData.name)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Profile/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error updating profile");
    });
  });

  it("shows default profile image when image fails to load", async () => {
    (axios.get as any).mockResolvedValue({ data: mockProfileData });

    renderComponent();

    await waitFor(() => {
      const profileImage = screen.getByAltText("Admin Profile");
      fireEvent.error(profileImage);
      expect(profileImage).toHaveAttribute(
        "src",
        expect.stringContaining("default-profile-image-url")
      );
    });
  });
});
