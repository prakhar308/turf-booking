exports.isValidUpdate = async (updates) => {
  return (!updates.includes('bookingStatus') || !updates.includes('price'));
}