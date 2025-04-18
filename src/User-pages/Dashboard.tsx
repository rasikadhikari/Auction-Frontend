const Dashboard = () => {
  const categories = [
    { name: "WATCHES", icon: "⌚" },
    { name: "ELECTRONICS", icon: "📷" },
    { name: "SPORTS", icon: "🏐" },
    { name: "REAL ESTATE", icon: "🏢" },
    { name: "VEHICLE", icon: "🚗" },
    { name: "JEWELRY", icon: "💎" },
    { name: "CLOTHES", icon: "👗" },
  ];

  const auctions = [
    {
      id: 1,
      title: "ARTISTIC EMBELLISHMENTS",
      image: "/api/placeholder/400/320",
      currentBid: "$8000.00",
      buyNow: "$8500.00",
      bids: 1,
      isOnStock: true,
    },
    {
      id: 2,
      title: "CERAMIC TEA SETS",
      image: "/api/placeholder/400/320",
      currentBid: "$5001.00",
      buyNow: "$5200.00",
      bids: 2,
      isOnStock: true,
    },
    {
      id: 3,
      title: "CHILDREN'S STORYBOOK",
      image: "/api/placeholder/400/320",
      currentBid: "$2002.00",
      buyNow: "$2100.00",
      bids: 1,
      isOnStock: true,
    },
    {
      id: 4,
      title: "CLASSIC MOVIE POSTERS",
      image: "/api/placeholder/400/320",
      currentBid: "$122339.00",
      buyNow: "$122500.00",
      bids: 2,
      isOnStock: true,
    },
    {
      id: 5,
      title: "VINTAGE VINYL RECORDS",
      image: "/api/placeholder/400/320",
      currentBid: "$3349.00",
      buyNow: "$3400.00",
      bids: 1,
      isOnStock: true,
    },
    {
      id: 6,
      title: "ANTIQUE MAPS AND GLOBES",
      image: "/api/placeholder/400/320",
      currentBid: "$34446.00",
      buyNow: "$35000.00",
      bids: 3,
      isOnStock: true,
    },
  ];

  return (
    <div className="bg-blue-600 text-white min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build, sell & collect digital items.
          </h1>
          <p className="text-gray-300 mb-6">
            Nulla facilisi. Maecenas ac tellus ut ligula interdum convallis.
            Nullam dapibus on erat in dolor posuere, none hendrerit lectus
            ornare.
          </p>

          {/* Search bar */}
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg max-w-xl">
            <input
              type="text"
              placeholder="Search product..."
              className="flex-grow px-4 py-2 text-gray-800 focus:outline-none"
            />
            <button className="bg-green-500 text-white px-6 font-semibold">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 flex space-x-8 text-center">
            <div>
              <h2 className="text-2xl font-bold">842M</h2>
              <p className="text-sm text-gray-300">Total Product</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">842M</h2>
              <p className="text-sm text-gray-300">Total Auction</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">54</h2>
              <p className="text-sm text-gray-300">Total Category</p>
            </div>
          </div>
        </div>

        {/* Right Content: Images + Cards */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
            alt="Main"
            className="rounded-3xl shadow-xl"
          />

          {/* Proof of Quality */}
          <div className="absolute top-0 left-0 bg-white text-gray-800 p-3 rounded-xl shadow-md text-sm">
            <p className="font-semibold">Proof of quality</p>
            <p className="text-gray-500">Lorem Ipsum Dolar Amet</p>
          </div>

          {/* Safe and Secure */}
          <div className="absolute bottom-0 right-0 bg-white text-gray-800 p-3 rounded-xl shadow-md text-sm">
            <p className="font-semibold">Safe and secure</p>
            <p className="text-gray-500">Lorem Ipsum Dolar Amet</p>
          </div>

          {/* Happy Client */}
          <div className="absolute bottom-[-3rem] left-0 bg-white text-gray-800 p-3 rounded-xl shadow-md text-sm w-fit">
            <p className="font-semibold">58M Happy Client</p>
            <div className="flex mt-1 space-x-1">
              <span className="w-6 h-6 rounded-full bg-blue-500"></span>
              <span className="w-6 h-6 rounded-full bg-yellow-500"></span>
              <span className="w-6 h-6 rounded-full bg-pink-500"></span>
              <span className="w-6 h-6 rounded-full bg-green-500"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Top Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center border border-gray-100 hover:shadow-md transition"
                >
                  <div className="text-emerald-800 text-2xl mb-2">
                    {category.icon}
                  </div>
                  <p className="font-medium text-gray-700 text-sm">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Auction Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                      {item.bids} {item.bids === 1 ? "Bid" : "Bids"}
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      {item.isOnStock ? "On Stock" : "Out of Stock"}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <p>
                        <span className="font-medium">Current Bid:</span>{" "}
                        {item.currentBid}
                      </p>
                      <p>
                        <span className="font-medium">Buy Now:</span>{" "}
                        {item.buyNow}
                      </p>
                    </div>
                    <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                      Place Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Top Seller
              </h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Seller"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">250+ Products Sold</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Seller"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    mary cristmas
                  </p>
                  <p className="text-xs text-gray-500">100+ Products Sold</p>
                </div>
              </div>
            </div>
          </div>
          {/* How Does Auction Work Section */}
          <div className="bg-blue-600 py-16 px-6">
            <div className="max-w-7xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-10 text-center">
                How Does Auction Work?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Create an Account",
                    description:
                      "Sign up for free and join the world of online auctions.",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/1828/1828490.png",
                  },
                  {
                    title: "Browse Auctions",
                    description:
                      "Explore a variety of items listed by sellers worldwide.",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/709/709496.png",
                  },
                  {
                    title: "Place a Bid",
                    description:
                      "Bid in real-time and get notified when you're outbid.",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3500/3500854.png",
                  },
                  {
                    title: "Win and Pay",
                    description:
                      "Win the auction and proceed to secure payment and delivery.",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/833/833472.png",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="relative bg-white text-gray-800 rounded-2xl shadow-xl p-6 pt-16 text-center"
                  >
                    {/* Floating Image */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-white"
                      />
                    </div>

                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
