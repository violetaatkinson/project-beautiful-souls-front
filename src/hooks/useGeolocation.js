import { useState, useEffect } from "react";

// Pide la ubicación del navegador. Si el usuario no da permiso o el
// navegador no la soporta, devuelve coords: null en vez de romper — toda
// la app tiene que poder funcionar sin geolocalización.
export function useGeolocation({ auto = true } = {}) {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState(auto ? "loading" : "idle");

  const request = () => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  };

  useEffect(() => {
    if (auto) request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coords, status, request };
}