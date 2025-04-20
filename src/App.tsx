import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// All user
const Dashboard = lazy(() => import("./User-pages/Dashboard"));
const ProductDetail = lazy(() => import("./User-pages/ProductDetail"));
// Buyer
const BuyerDashboard = lazy(() => import("./Buyer-page/BuyerDashboard"));
const EditBuyerProfile = lazy(() => import("./Buyer-page/EditBuyerProfile"));
const BuyerWinningProducts = lazy(
  () => import("./Buyer-page/BuyerWinningProducts")
);
// seller
const SellerDashboard = lazy(() => import("./Seller-page/SellerDashboard"));
const SellerDetail = lazy(() => import("./Seller-page/SellerProduct"));
const CreateProduct = lazy(() => import("./Seller-page/CreateProduct"));
const EditSellerProfile = lazy(() => import("./Seller-page/EditSellerProfile"));
const SellerSoldProduct = lazy(() => import("./Seller-page/SellerSoldproduct"));
// Admin
const AdminDashboard = lazy(() => import("./Admin-Pages/AdminDashboard"));
const AdminCategories = lazy(() => import("./Admin-Pages/AdminCategories"));
const AdminShowUser = lazy(() => import("./Admin-Pages/AdminShowUser"));
const AdminViewProduct = lazy(() => import("./Admin-Pages/AdminViewProduct"));
const AdminCreateProduct = lazy(
  () => import("./Admin-Pages/AdminCreateproduct")
);
const AdminSoldProduct = lazy(() => import("./Admin-Pages/AdminSoldProduct"));
const AdminEditProfile = lazy(() => import("./Admin-Pages/AdminProfile"));
function App() {
  return (
    <BrowserRouter>
      <AuctionContent />
    </BrowserRouter>
  );
}

function AuctionContent() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductDetail />} />
            {/* Buyer routes */}
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/editbuyer" element={<EditBuyerProfile />} />
            <Route path="/winningproduct" element={<BuyerWinningProducts />} />

            {/* Seller Routes */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/sellerproduct" element={<SellerDetail />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/editprofile" element={<EditSellerProfile />} />
            <Route path="/soldproduct" element={<SellerSoldProduct />} />

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="category" element={<AdminCategories />} />
              <Route path="userdetail" element={<AdminShowUser />} />
              <Route path="viewproduct" element={<AdminViewProduct />} />
              <Route path="createproduct" element={<AdminCreateProduct />} />
              <Route path="soldproduct" element={<AdminSoldProduct />} />
              <Route path="editprofile" element={<AdminEditProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
