const schema = require('../../models/zapis.js');
const mongoose = require('mongoose');

module.exports = {
    name: "addzapis",
    description: "Přidání nového zápisu.",
    options: [
        {
            name: "predmet",
            description: "Předmět zápisu",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Matematika",
                    value: "MAT"
                },
                {
                    name: "Fyzika",
                    value: "FYZ"
                },
                {
                    name: "Zaklady Elektrotechniky",
                    value: "ZAE"
                },
                {
                    name: "Elektrotechnika",
                    value: "ELT"
                }
            ]
        },
        {
            name: "hodina",
            description: "Hodina z které zápis je",
            type: 3,
            required: true, 
        },
        {
            name: "nadpis",
            description: "Nadpis zápisu",
            type: 3,
            required: true, 
        },
        {
            name: "zapis",
            description: "Pdf soubor zápisu",
            type: 11,
            required: true,
        }
    ],
    dm_permission: false,

    run: async (client, command, args) => {
        
        if(command.user.id !== "741065489832214558") return command.reply("Nemáš práva vytvářet nové zápisy!")

        const zapis = await command.options.get("zapis").attachment.url;
        new schema({
            Predmet: args[0],
            Hodina: args[1],
            Nadpis: args[2],
            Zapis: zapis,
        }).save();
        command.reply({content: "Zápis byl úspěšně přídán", ephemeral: true});
    }
}