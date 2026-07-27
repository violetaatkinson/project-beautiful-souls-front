export function getPetBadges(pet) {
	const badges = [];

	if (pet.health?.vaccinated)
		badges.push({ key: "vaccinated", label: "Vaccinated" });
	if (pet.health?.sterilized)
		badges.push({ key: "sterilized", label: "Spayed/Neutered" });
	if (pet.houseTrained) badges.push({ key: "trained", label: "House trained" });
	if (pet.compatibility?.withKids === "yes")
		badges.push({ key: "kids", label: "Good with kids" });
	if (pet.compatibility?.withDogs === "yes")
		badges.push({ key: "dogs", label: "Good with dogs" });
	if (pet.compatibility?.withCats === "yes")
		badges.push({ key: "cats", label: "Good with cats" });
	if (pet.energyLevel === "High")
		badges.push({ key: "energy", label: "High energy" });

	const ageInMonths = (pet.ageYears || 0) * 12 + (pet.ageMonths || 0);
	if (ageInMonths > 0 && ageInMonths <= 12)
		badges.push({ key: "puppy", label: "Puppy" });
	if (pet.ageYears >= 8) badges.push({ key: "senior", label: "Senior" });

	return badges;
}

export function formatPetAge(pet) {
	const parts = [];
	if (pet.ageYears)
		parts.push(`${pet.ageYears} year${pet.ageYears === 1 ? "" : "s"}`);
	if (pet.ageMonths)
		parts.push(
			`${pet.ageMonths} month${pet.ageMonths === 1 ? "" : "es"}`.replace(
				"es",
				"s",
			),
		);
	return parts.join(" ");
}
