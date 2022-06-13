import { StreamerInfo } from '../data';
import data from './data.json';


const utils = {
  randomize: (min: number, max: number): number =>  Math.floor(Math.random() * (max + 1)) + min,
  update: (): StreamerInfo[] => {
    const next = data.map((item, index) => ({
      ...item,
      score: item.score,
      rank: index + 1,
    }));
    
    const change = utils.randomize(0, 2);

    for (let i = 0; i < change; i++) {
      const index = utils.randomize(0, data.length - 1);

      next[index].score = next[index].score + utils.randomize(1000, 5000);
    }

    next.sort((a, b) => b.score - a.score);

    const ranked = next.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    return ranked;
  }
};

export default utils;
