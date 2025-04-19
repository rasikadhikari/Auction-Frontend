import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// buyer
const Dashboard = lazy(() => import("./User-pages/Dashboard"));
const ProductDetail = lazy(() => import("./User-pages/ProductDetail"));
// seller
const SellerDashboard = lazy(() => import("./Seller-page/SellerDashboard"));
const SellerDetail = lazy(() => import("./Seller-page/SellerProduct"));
const CreateProduct = lazy(() => import("./Seller-page/CreateProduct"));
const EditSellerProfile = lazy(() => import("./Seller-page/EditSellerProfile"));
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
            <Route path="/auctions" element={<div>Auctions</div>} />
            <Route path="/auctions/:id" element={<div>Auction Details</div>} />
            <Route path="/create" element={<div>Create Auction</div>} />
            <Route path="/profile" element={<div>User Profile</div>} />
            <Route path="/settings" element={<div>User Settings</div>} />

            {/* Seller Routes */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/sellerproduct" element={<SellerDetail />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/editprofile" element={<EditSellerProfile />} />

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="users" element={<div>Admin Users</div>} />
              <Route path="auctions" element={<div>Admin Auctions</div>} />
              <Route path="reports" element={<div>Admin Reports</div>} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
