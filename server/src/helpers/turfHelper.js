exports.createSlots = () => {
  // for now set startTime (opening time) as 06:00:00 AM and price as 500
  // TODO: create slots and price dynamically. Different turfs can have different opening time and prices according to the opening.
  let startTime = new Date();
  startTime.setHours(6);
  startTime.setMinutes(0);
  startTime.setSeconds(0);
  let endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  const slots = [];
  slots.push({
    startTime: startTime.toLocaleTimeString(),
    endTime: endTime.toLocaleTimeString(),
    price: 500
  })

  for (let i = 1; i < 18; i++) {
    startTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    endTime = new Date(endTime.getTime() + 60 * 60 * 1000);
    slots.push({
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      price: 500
    });
  }

  return slots;
}