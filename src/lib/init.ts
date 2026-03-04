import { Bookie } from "./bookie"

const horses = ['Bamboo Harvester', 'Brooklyn Surpreme', 'Buttermilk', 'Clever Hans', 'Figure', 'Marocco']


async function main() {
    const bookie = new Bookie();
    for (var horse in horses) {
        bookie.add_horse(horse);
    }
}

main();