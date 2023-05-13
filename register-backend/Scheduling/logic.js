import getSlots from './exstraction.cjs'


function findOverlappingTimeSlots(slot1, slot2) {
    console.log("EXCE findOverlappingTimeSlots")
    const overlappingSlots = [];
    let i = 0, j = 0;
    while (i < slot1.length && j < slot2.length) {
        const start1 = slot1[i].from.getTime();
        const end1 = slot1[i].till.getTime();
        const start2 = slot2[j].from.getTime();
        const end2 = slot2[j].till.getTime();

        if (end1 <= start2) {
            i++;
        } else if (end2 <= start1) {
            j++;
        } else {
            const overlapStart = new Date(Math.max(start1, start2));
            const overlapEnd = new Date(Math.min(end1, end2));
            if (overlapEnd.getTime() - overlapStart.getTime() > 0) {
                overlappingSlots.push({
                    from: overlapStart,
                    till: overlapEnd,
                    location: slot1[i].location,
                    player: slot1[i].player
                });
            }
            if (end1 < end2) {
                i++;
            } else {
                j++;
            }
        }
    }
    return overlappingSlots;
}

//Excecute Over Every 10 minutes session

function scheduleGame(playerSchedules) {
    
    const n = playerSchedules.length;
    // console.log(n)
    let overlappingSlots = playerSchedules[0];
    for (let i = 1; i < n; i++) {
        overlappingSlots = findOverlappingTimeSlots(overlappingSlots, playerSchedules[i]);
    }
    if (overlappingSlots && overlappingSlots.length > 0) {
        if (overlappingSlots.length > 0) {
            const gameSlot = overlappingSlots[0];
            const players = overlappingSlots.map(slot => slot.player);
            const game = {
                players,
                from: gameSlot.from,
                till: gameSlot.till,
                location: gameSlot.location
            };
            console.log(`Scheduled game between ${players.join(',')}`);
            console.log(`Date: ${game.from.toLocaleDateString()}, Time: ${game.from.toLocaleTimeString()} - ${game.till.toLocaleTimeString()}`);
            console.log(`Location: ${game.location}`);
            return game;
        } else {
            console.log('No overlapping time slot found');
            return null;
        }
    }
}


//   Schema Equivalent Hardcoded Cases
// Tobe Replaced With Data From Clusters
// const playerSchedules = [
//     [
//         { player: 'Alice', from: new Date('2023-04-26T10:00:00'), till: new Date('2023-04-26T14:13:00'), location: 'Park' },
//         { player: 'Alice', from: new Date('2023-04-26T15:00:00'), till: new Date('2023-04-26T18:00:00'), location: 'Gym' },
//         { player: 'Alice', from: new Date('2023-04-26T20:00:00'), till: new Date('2023-04-26T22:00:00'), location: 'Park' }
//     ],
//     [
//         { player: 'Bob', from: new Date('2023-04-26T10:01:00'), till: new Date('2023-04-26T14:13:00'), location: 'Park' },
//         { player: 'Bob', from: new Date('2023-04-26T16:00:00'), till: new Date('2023-04-26T19:00:00'), location: 'Gym' },
//         { player: 'Bob', from: new Date('2023-04-26T21:00:00'), till: new Date('2023-04-26T23:00:00'), location: 'Park' }
//     ],
//     [
//         { player: 'Charlie', from: new Date('2023-04-26T13:00:00'), till: new Date('2023-04-26T16:00:00'), location: 'Gym' },
//         { player: 'Charlie', from: new Date('2023-04-26T18:00:00'), till: new Date('2023-04-26T20:00:00'), location: 'Park' },
//         { player: 'Charlie', from: new Date('2023-04-26T22:00:00'), till: new Date('2023-04-26T23:30:00'), location: 'Gym' }
//     ]
// ];



//   test1
const playerSchedules = getSlots()
console.log(playerSchedules)
scheduleGame(playerSchedules);