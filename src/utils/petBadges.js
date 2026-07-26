
export function getPetBadges(pet) {
  const badges = [];

  if (pet.health?.vaccinated) badges.push({ key: "vaccinated", label: "Vacunado" });
  if (pet.health?.sterilized) badges.push({ key: "sterilized", label: "Esterilizado" });
  if (pet.houseTrained) badges.push({ key: "trained", label: "Entrenado" });
  if (pet.compatibility?.withKids === "yes") badges.push({ key: "kids", label: "Bueno con niños" });
  if (pet.compatibility?.withDogs === "yes") badges.push({ key: "dogs", label: "Bueno con perros" });
  if (pet.compatibility?.withCats === "yes") badges.push({ key: "cats", label: "Bueno con gatos" });
  if (pet.energyLevel === "High") badges.push({ key: "energy", label: "Alta energía" });

  const ageInMonths = (pet.ageYears || 0) * 12 + (pet.ageMonths || 0);
  if (ageInMonths > 0 && ageInMonths <= 12) badges.push({ key: "puppy", label: "Cachorro" });
  if (pet.ageYears >= 8) badges.push({ key: "senior", label: "Senior" });

  return badges;
}

export function formatPetAge(pet) {
  const parts = [];
  if (pet.ageYears) parts.push(`${pet.ageYears} año${pet.ageYears === 1 ? "" : "s"}`);
  if (pet.ageMonths) parts.push(`${pet.ageMonths} mes${pet.ageMonths === 1 ? "" : "es"}`);
  return parts.join(" y ");
}