import { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./Service/ProtectedRoute";
import { AuthContext, AuthToken } from "./Context/AuthContext";

// All user
const Dashboard = lazy(() => import("./User-pages/Dashboard"));
const ProductDetail = lazy(() => import("./User-pages/ProductDetail"));
const NotAuthorized = lazy(() => import("./User-pages/403-Authpage"));
const UnderConstruction = lazy(() => import("./User-pages/UnderConstruction"));
const About = lazy(() => import("./User-pages/About"));
const Contact = lazy(() => import("./User-pages/Contact"));
// Buyer
const BuyerDashboard = lazy(() => import("./Buyer-page/BuyerDashboard"));
const EditBuyerProfile = lazy(() => import("./Buyer-page/EditBuyerProfile"));
const BuyerWinningProducts = lazy(
  () => import("./Buyer-page/BuyerWinningProducts")
);
const BuyerWishlist = lazy(() => import("./Buyer-page/BuyerWishlist"));
// seller
const SellerDashboard = lazy(() => import("./Seller-page/SellerDashboard"));
const SellerDetail = lazy(() => import("./Seller-page/SellerProduct"));
const CreateProduct = lazy(() => import("./Seller-page/CreateProduct"));
const EditSellerProfile = lazy(() => import("./Seller-page/EditSellerProfile"));
const SellerSoldProduct = lazy(() => import("./Seller-page/SellerSoldproduct"));
const SellerWishlist = lazy(() => import("./Seller-page/SellerWishlist"));
const SellerEditProduct = lazy(() => import("./Source-page/SellerEditProduct"));
// Admin
const AdminDashboard = lazy(() => import("./Admin-Pages/AdminDashboard"));
const AdminCategories = lazy(() => import("./Admin-Pages/AdminCategories"));
const AdminShowUser = lazy(() => import("./Admin-Pages/AdminShowUser"));
const AdminViewProduct = lazy(() => import("./Admin-Pages/AdminViewProduct"));
const AdminCreateProduct = lazy(
  () => import("./Admin-Pages/AdminCreateproduct")
);
const AdminEditProduct = lazy(() => import("./Source-page/AdminEditProduct"));
const AdminSoldProduct = lazy(() => import("./Admin-Pages/AdminSoldProduct"));
const AdminEditProfile = lazy(() => import("./Admin-Pages/AdminProfile"));
const AdminCommissionVerify = lazy(
  () => import("./Admin-Pages/AdminCommissionVerify")
);
const AdminOnlyProduct = lazy(() => import("./Admin-Pages/AdminProduct"));
const AdminEditCategory = lazy(() => import("./Source-page/AdminEditCategory"));
const AdminCreateCategory = lazy(
  () => import("./Source-page/AdminCreateCategory")
);
const AdminWishlist = lazy(() => import("./Admin-Pages/AdminWishlist"));
// Aunthentication
const Login = lazy(() => import("./Authentication/Login"));
const Signup = lazy(() => import("./Authentication/Signup"));
const BecomeSeller = lazy(() => import("./Authentication/BecomeASeller"));

function App() {
  const [auth, setAuth] = useState<AuthToken>({
    token: sessionStorage.getItem("token"),
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user") as string)
      : null,
  });
  const changeAuth = (token: string, user: any) => {
    setAuth({ token, user });
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <AuthContext.Provider value={{ auth, changeAuth }}>
      <BrowserRouter>
        <AuctionContent />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

function AuctionContent() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-white">
              <div className="w-12 h-12 border-4 border-[#155DFC] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/notauthorize" element={<NotAuthorized />} />
            <Route
              path="/underconstruction"
              element={<UnderConstruction />}
            ></Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Buyer routes */}
            <Route element={<ProtectedRoute allowedRoles={["buyer"]} />}>
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/editbuyer" element={<EditBuyerProfile />} />
              <Route
                path="/winningproduct"
                element={<BuyerWinningProducts />}
              />
              <Route path="/wishlist" element={<BuyerWishlist />} />
            </Route>

            {/* Seller Routes */}
            <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/sellerproduct" element={<SellerDetail />} />
              <Route path="/createproduct" element={<CreateProduct />} />
              <Route path="/editprofile" element={<EditSellerProfile />} />
              <Route path="/soldproduct" element={<SellerSoldProduct />} />
              <Route path="/sellerwishlist" element={<SellerWishlist />} />
              <Route path="/editproduct" element={<SellerEditProduct />} />
            </Route>

            {/* Authentication Routes*/}
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/becomeseller" element={<BecomeSeller />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<ProtectedRoute allowedRoles={["admin"]} />}
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="category" element={<AdminCategories />} />
              <Route path="userdetail" element={<AdminShowUser />} />
              <Route path="viewproduct" element={<AdminViewProduct />} />
              <Route path="createproduct" element={<AdminCreateProduct />} />
              <Route path="soldproduct" element={<AdminSoldProduct />} />
              <Route path="editprofile" element={<AdminEditProfile />} />
              <Route path="adminproduct" element={<AdminOnlyProduct />} />
              <Route path="createcategory" element={<AdminCreateCategory />} />
              <Route path="editcategory/:id" element={<AdminEditCategory />} />
              <Route path="wishlist" element={<AdminWishlist />} />
              <Route path="admineditproduct" element={<AdminEditProduct />} />
              <Route
                path="commission/:id"
                element={<AdminCommissionVerify />}
              />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
