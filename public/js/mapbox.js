/*eslint-disable*/
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5naWVqbzIxIiwiYSI6ImNsd2t0Y3N2MzA2YW8ya254NHBzMXhjNjMifQ.7zlAwiivr75PzaXBYLvyMQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/angiejo21/clwktnn2c00m401qscwka9blq", // style URL
    // center: [-118.113491, 34.111745], // starting position [lng, lat]
    // zoom: 10, // starting zoom
    // interactive: false,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Add marker
    const el = document.createElement("div");
    el.className = "marker";
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    //Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
