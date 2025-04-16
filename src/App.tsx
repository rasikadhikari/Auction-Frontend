import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/auctions" element={<div>Auctions</div>} />
          <Route path="/auctions/:id" element={<div>Auction Details</div>} />
          <Route path="/create" element={<div>Create Auction</div>} />
          <Route path="/profile" element={<div>User Profile</div>} />
          <Route path="/settings" element={<div>User Settings</div>} />

          <Route path="/admin">
            <Route path="users" element={<div>Admin Users</div>} />
            <Route path="auctions" element={<div>Admin Auctions</div>} />
            <Route path="reports" element={<div>Admin Reports</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
