const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isOwnHero: {
        type: Boolean,
        default: true
    },
    powerstats: {
        type: Object,
        intelligence: {
            type: Number,
            default: 0
        },
        strength: {
            type: Number,
            default: 0
        },
        durability: {
            type: Number,
            default: 0
        },
        power: {
            type: Number,
            default: 0
        },
        combat: {
            type: Number,
            default: 0
        }
    },
    biography: {
        type: Object,
        'full-name': {
            type: String,
            default: ''
        },
        'alter-egos': {
            type: String,
            default: ''
        },
        aliases: {
            type: Array,
            default: ['']
        },
        'place-of-birth': {
            type: String,
            default: ''
        },
        'first-appearance': {
            type: String,
            default: ''
        },
        publisher: {
            type: String,
            default: ''
        },
        alignment: {
            type: String,
            default: ''
        },
    },
    appearance: {
        'eye-color': {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        'hair-color': {
            type: String,
            default: ''
        },
        height: {
            type: Array,
            default: ['-', '0 cm']
        },
        race: {
            type: String,
            default: ''
        },
        weight: {
            type: Array,
            default: ['0 lb', '0 kg']
        },
    },
    work: {
        type: Object,
        base: {
            type: String,
            default: ''
        },
        occupation: {
            type: String,
            default: ''
        }
    },
    connections: {
        type: Object,
        'group-affiliation': {
            type: String,
            default: ''
        },
        relatives: {
            type: String,
            default: ''
        }
    }
})

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;