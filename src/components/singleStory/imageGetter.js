import { env } from '../../environment';
const counts = {
  flower: 10,
  gloves: 3,
  handwash: 5,
  mask: 8,
  mountain: 9,
  oxygen: 4,
  sanitizer: 5,
  socialdistancing: 6,
  trees: 10,
  vaccine: 11,
  virus: 9,
  water: 10,
};

const base_url = env().mode === 'prod' ? '/covidsafar':'';

function randomChoices(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export const getImage = (keys, no_of_images) => {
  let res = [];
  let c = 0;
  for (let k = 0; k < no_of_images; k++) {
    if (k < keys.length) {
      if (c < no_of_images) {
        if (["covid", "covid-19", "virus"].includes(keys[k])) {
          res.push(
            base_url + "/pictures/virus" + (Math.floor(Math.random() * counts.virus) + 1)
          );
          c = c + 1;
        } else if (
          ["oxygen", "breath", "respiratory", "chest"].includes(keys[k])
        ) {
          res.push(
            base_url + "/pictures/oxygen" + (Math.floor(Math.random() * counts.oxygen) + 1)
          );
          c = c + 1;
        } else if (["sanitize", "wash", "hand"].includes(keys[k])) {
          res.push(
            base_url + "/pictures/handwash" +
              (Math.floor(Math.random() * counts.handwash) + 1)
          );
          c = c + 1;
        } else if (["social", "distance"].includes(keys[k])) {
          res.push(
            base_url + "/pictures/socialdistancing" +
              (Math.floor(Math.random() * counts.socialdistancing) + 1)
          );
          c = c + 1;
        } else if (
          ["vaccine", "medical", "cure", "prevent"].includes(keys[k])
        ) {
          res.push(
            base_url + "/pictures/vaccine" +
              (Math.floor(Math.random() * counts.vaccine) + 1)
          );
          c = c + 1;
        } else if (["death", "die", "died"].includes(keys[k])) {
          res.push(
            base_url + "/pictures/flower" + (Math.floor(Math.random() * counts.flower) + 1)
          );
          c = c + 1;
        } else {
          let i = randomChoices([
            "mountain",
            "trees",
            "water",
            "virus",
            "vaccine",
            "flower",
            "handwash",
            "oxygen",
            "socialdistancing",
          ]);
          res.push(
            base_url + "/pictures/" + i + (Math.floor(Math.random() * counts[i]) + 1)
          );
          c = c + 1;
        }
      } else {
        return res;
      }
    } else {
      if (c >= no_of_images) {
        return res;
      }
      let i = randomChoices([
        "mountain",
        "trees",
        "water",
        "virus",
        "vaccine",
        "flower",
        "handwash",
        "oxygen",
        "socialdistancing",
      ]);
      res.push(base_url + "/pictures/" + i + (Math.floor(Math.random() * counts[i]) + 1));
      c = c + 1;
    }
  }
  return res;
};
