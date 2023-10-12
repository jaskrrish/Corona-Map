function updateMap() {
  console.log("Updating Map with RealTime");
  fetch("/data.json")
    .then((response) => response.json())
    .then((rsp) => {
      // console.log(rsp.data)
      rsp.data.forEach((element) => {
        latitude = element.latitude;
        longitude = element.longitude;
        //
        cases = element.infected;
        //
        if (cases > 255) {
          color = "rgb(255, 0, 0)";
        } else {
          color = `rgb(${cases},0,0)`;
        }
        //
        //Pop-up Marker
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<p> PLACE: ${element.name}</p><p> CASES: ${cases}</p>`
            );
        //Map Marker
        new mapboxgl.Marker({
          draggable: false,
          color: color,
        })
          .setLngLat([longitude, latitude])
          .addTo(map)
          .setPopup(popup)
        //
        //Hover Effect
      });
    });
}
let interval = 20000;
setInterval(updateMap, interval);
// updateMap();