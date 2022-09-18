const schema = require('../../models/rovnice.js');
const mongoose = require('mongoose');

module.exports = {
    name: "addrovnice",
    description: "Přidání nové rovnice",
    options: [
        {
            name: "predmet",
            description: "Předmět rovnice",
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
            name: "nazev",
            description: "Název rovnice",
            type: 3,
            required: true, 
        },
        {
            name: "rovnice",
            description: "Samostatná rovnice",
            type: 3,
            required: true, 
        },
        {
            name: "vypocita",
            description: "Co tato rovnice vypočítá?",
            type: 3,
            required: true, 
        }
    ],
    dm_permission: false,

    run: (client, command, args) => {

        if(command.user.id !== "741065489832214558") return command.reply("Nemáš práva vytvářet nové rovnice!");

        new schema({
            Predmet: args[0],
            Nazev: args[1],
            Rovnice: args[2],
            Vypocita: args[3],
        }).save();
        command.reply({content: "Rovnice byla úspěšně přídána", ephemeral: true});
    }
}