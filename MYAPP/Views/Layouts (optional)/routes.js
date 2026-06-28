const express = require('express');

const router = express.Router();

// Simplest parameterized view
router.get("/", (req, res) => {
    res.render("index", { title: "Hello!!!!!" })
})

const funFacts = [
    "1. There are more stars in the universe than grains of sand on all the beaches on Earth. That’s at least a billion trillion!",
    "2. Singapore is home to more than 390 species of birds and at least 2,100 native vascular plants, of which more than 1,500 species are classified as extant in Singapore",
    "3. Mangroves have great capacity to take carbon out of the atmosphere. A patch of mangroves could absorb as much as 10 times the carbon of a similarly sized patch of terrestrial forest, mitigating the effects of sea level rise.",
    "4. Quantum physics teaches us that everything is energy at the most fundamental levels. Reality is merely an illusion, although a very persistent one.",
    "5. The word vaccine comes from the cowpox virus vaccinia which derives from the Latin word vacca for cow."
]

let count = 0

router.get("/fact", (req, res) => {
    res.render("fact", { title: "Here is a fun fact!", paragraph: funFacts[count]});
    count++
    
    if (count > funFacts.length - 1) {
        count = 0
    }
});

// Render all facts at once
router.get("/all_facts", (req, res) => {
    res.render("all_facts", { title: "All Fun Facts", facts: funFacts });
});

router.get("/7boom", (req, res) => {
    const num = req.query.num

    let isBoom = (num % 7 == 0) || /* Don't need as 7 % 7 == 0 */ String(num).includes("7")
    res.render("7boom", {boom: isBoom})
});

module.exports = router;