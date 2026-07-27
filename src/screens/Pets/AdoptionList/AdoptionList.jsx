import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Heart, X, RotateCcw, PawPrint, MapPin, ShieldCheck, MessageCircle } from "lucide-react";

import { getPets, likePet, dislikePet } from "../../../services/PetService";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { getPetBadges, formatPetAge } from "../../../utils/petBadges";
import { NavbarLayout } from "../../../layout/NavbarLayout";
import AuthContext from "../../../contexts/AuthContext";
import "./AdoptionList.css";

const SWIPE_THRESHOLD = 120;
const ROTATION_FACTOR = 14;

const cardStyle = (x, y, rot, scale) => ({
  transform: interpolate(
    [x, y, rot, scale],
    (x, y, rot, s) => `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${s})`
  ),
});

function AdoptionList() {
  const navigate = useNavigate();
  const { coords } = useGeolocation();
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRemoved, setLastRemoved] = useState(null);

  useEffect(() => {
    getPets(coords).then((data) => {
      setPets(data.slice().reverse());
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [springs, api] = useSprings(pets.length, () => ({ x: 0, y: 0, rot: 0, scale: 1 }));

  useEffect(() => {
    api.start((i) => {
      const offsetFromTop = pets.length - 1 - i;
      return {
        x: 0,
        y: Math.min(offsetFromTop, 2) * 8,
        rot: 0,
        scale: 1 - Math.min(offsetFromTop, 2) * 0.04,
      };
    });
  }, [pets.length, api]);

  const removeTopCard = (pet, action) => {
    setLastRemoved({ pet, action });
    setPets((prev) => prev.filter((p) => p._id !== pet._id));
  };

  const animateAway = (index, direction) => {
    api.start((i) => {
      if (i !== index) return;
      const x = direction === "right" ? 600 : -600;
      const rot = direction === "right" ? 20 : -20;
      return { x, rot, config: { friction: 50, tension: 220 } };
    });
  };

  const handleLike = (pet) => {
    if (!pet) return;
    likePet(pet._id);
    animateAway(pets.length - 1, "right");
    setTimeout(() => removeTopCard(pet, "like"), 220);
  };

  const handleDislike = (pet) => {
    if (!pet) return;
    dislikePet(pet._id);
    animateAway(pets.length - 1, "left");
    setTimeout(() => removeTopCard(pet, "dislike"), 220);
  };

  const handleUndo = () => {
    if (!lastRemoved) return;
    setPets((prev) => [...prev, lastRemoved.pet]);
    setLastRemoved(null);
  };

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity: [vx], tap }) => {
      if (tap) {
        navigate(`/adoptions/${pets[index]._id}`);
        return;
      }

      const trigger = Math.abs(mx) > SWIPE_THRESHOLD || vx > 0.6;

      if (!down && trigger) {
        const pet = pets[index];
        xDir < 0 ? handleDislike(pet) : handleLike(pet);
        return;
      }

      const offsetFromTop = pets.length - 1 - index;

      api.start((i) => {
        if (i !== index) return;
        const x = down ? mx : 0;
        const rot = down ? mx / ROTATION_FACTOR : 0;
        return {
          x,
          y: down ? 0 : Math.min(offsetFromTop, 2) * 8,
          rot,
          scale: down ? 1.05 : 1 - Math.min(offsetFromTop, 2) * 0.04,
          immediate: down,
        };
      });
    },
    { filterTaps: true }
  );

  const topPet = pets[pets.length - 1];

  return (
    <NavbarLayout>
      <div className="swipe-screen">
        {loading && <p className="swipe-loading">Finding your match...</p>}

        {!loading && pets.length === 0 && (
          <div className="not-found">
            <span className="empty-logo">
              <PawPrint size={26} strokeWidth={2.4} />
            </span>
            <h5>No pets right now</h5>
            <p className="swipe-empty-sub">Check back soon</p>
          </div>
        )}

        <div className="card-stack">
          {springs.map(({ x, y, rot, scale }, i) => {
            const pet = pets[i];
            if (!pet) return null;

            const isTop = i === pets.length - 1;
            const badges = getPetBadges(pet);
            const age = formatPetAge(pet);
            const photo = pet.images?.[0];

            return (
              <animated.div
                className="swipe-card"
                key={pet._id}
                style={{ ...cardStyle(x, y, rot, scale), zIndex: i }}
                {...(isTop ? bind(i) : {})}
              >
                <div
                  className={`card-image ${!photo ? "no-photo" : ""}`}
                  style={photo ? { backgroundImage: `url(${photo})` } : undefined}
                >
                  {!photo && (
                    <div className="card-image-fallback">
                      <PawPrint size={56} strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="card-gradient" />
                  <div className="card-info">
                    <h2 className="card-name-row">
                      {pet.name}
                      {age && `, ${age}`}
                      {pet.owner?.shelterVerified && (
                        <ShieldCheck size={20} className="card-verified" />
                      )}
                    </h2>
                    <p className="card-subline">
                      {pet.breed || pet.species}
                      {pet.sex && ` · ${pet.sex}`}
                    </p>
                    {(pet.distanceKm != null || pet.location?.city) && (
                      <p className="card-location">
                        <MapPin size={14} />
                        {pet.distanceKm != null ? `${pet.distanceKm} km away` : pet.location.city}
                      </p>
                    )}
                    {badges.length > 0 && (
                      <div className="card-badges">
                        {badges.slice(0, 4).map((b) => (
                          <span key={b.key} className="card-badge">{b.label}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </animated.div>
            );
          })}
        </div>

        {topPet && (
          <div className="swipe-actions">
            <button
              className="swipe-btn swipe-btn-back"
              onClick={handleUndo}
              disabled={!lastRemoved}
              aria-label="Undo"
            >
              <RotateCcw size={20} />
            </button>
            <button className="swipe-btn swipe-btn-dislike" onClick={() => handleDislike(topPet)} aria-label="Pass">
              <X size={26} />
            </button>
            {topPet.owner && user && user.id !== topPet.owner._id && (
              <Link
                className="link-unstyled swipe-btn swipe-btn-message"
                to={`/users/chat/${topPet.owner._id}/${topPet._id}`}
                aria-label={`Message about ${topPet.name}`}
              >
                <MessageCircle size={22} />
              </Link>
            )}
            <button className="swipe-btn swipe-btn-like" onClick={() => handleLike(topPet)} aria-label="Like">
              <Heart size={24} fill="currentColor" strokeWidth={0} />
            </button>
          </div>
        )}
      </div>
    </NavbarLayout>
  );
}

export default AdoptionList;