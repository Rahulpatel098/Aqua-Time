export const calculateWaterRequirement = (weight: number, gender?: string, age?: number): number => {
  let multiplier = 35;
  if (gender === 'Male') multiplier = 37;
  else if (gender === 'Female') multiplier = 33;

  return weight * multiplier;
};
