const getRouteDetails = (req, res) => {
  res.json({
    name: "Revalto API",
    description: "A modern reselling marketplace where users can list, discover, and revalue products. Built for simplicity and trust, Revalto enables people to resell items seamlessly while ensuring transparent pricing and secure exchanges.",
    routes: {
      users: "in_production",
      products: "in_production",
    }
  });
};

export {getRouteDetails}
