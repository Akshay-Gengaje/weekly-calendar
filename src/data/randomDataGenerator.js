function generateRandomEvents(
  startDate,
  endDate,
  startTime,
  endTime,
  gapMinutes,
  numEvents
) {
  const events = [];

  const startMs = startDate.getTime();
  const endMs = endDate.getTime();
  const gapMs = gapMinutes * 60 * 1000; // convert minutes to milliseconds

  const possibleTimeSlots = [];
  let currentTime = new Date(startDate); // Start from the beginning of the start date

  // Create possible time slots between 8 AM and 11 PM
  while (currentTime <= endDate) {
    const currentHours = currentTime.getHours();
    if (currentHours >= 8 && currentHours <= 23) {
      possibleTimeSlots.push(
        currentTime.toLocaleTimeString("en-US", { hour12: false })
      );
    }
    currentTime = addMinutes(currentTime, gapMinutes);
  }

  // Ensure numEvents doesn't exceed available time slots
  numEvents = Math.min(numEvents, possibleTimeSlots.length);

  for (let i = 0; i < numEvents; i++) {
    const randomTimeSlotIndex = Math.floor(
      Math.random() * possibleTimeSlots.length
    );
    const randomTimeSlot = possibleTimeSlots.splice(randomTimeSlotIndex, 1)[0];

    const randomMs = Math.floor(Math.random() * (endMs - startMs)) + startMs;
    const date = new Date(randomMs).toISOString().split("T")[0];
    const id = 100 + i;
    const name = `Random Event ${id}`;
    const timestamp = new Date(`${date} ${randomTimeSlot}`).toISOString();

    events.push({
      Id: id,
      Name: name,
      Date: date,
      Time: randomTimeSlot.toString(),
      timestamp: timestamp,
    });
  }

  return events;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

const startDate = new Date("2023-12-06");
const endDate = new Date("2023-12-12");
const gapMinutes = 30;
const numEvents = 10; // Specify the desired number of events

const events = generateRandomEvents(
  startDate,
  endDate,
  null,
  null,
  gapMinutes,
  numEvents
);

console.log(events);
