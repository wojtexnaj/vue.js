require('../../db/mongoose');
const express = require('express');
const app = express();
const Hero = require('../../models/hero');

app.use(express.json());
const router = express.Router();

router.post('/', (req, res) => {
    if (!req || !req.body) return res.status(404).send('Miss body in request!');

    const addedHero = addHero(req.body);
    addedHero.then(hero => {
        res.send(mapHeroObject(hero));
    }).catch(err => res.send(err));

});

//// db functions

const addHero = async (hero) => {
    try {
        const heroToSave = new Hero(hero);
        await heroToSave.save();
        return heroToSave;
    } catch (err) {
        return err;
    }
}

//// map functions

const mapHeroObject = (hero) => {
    return {
        name: hero.name,
        id: hero.id,
        isOwnHero: hero.isOwnHero,
        powerstats: hero.powerstats,
        biography: hero.biography,
        appearance: hero.appearance,
        work: hero.work,
        connections: hero.connections
    };
}

module.exports = router;
