const schema = require('../../models/zapis.js');
const mongoose = require('mongoose');
const discord = require('discord.js');

module.exports = {
    name: "zapis",
    description: "Najdi zápis",
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
            name: "vyhledat",
            description: "Název zápisu nebo číslo hodiny",
            type: 3,
            required: false,
        }
    ],
    dm_permission: false,

    run: async (client, command, args) => {
        const predmet = args[0];
        const vyhledavani = args[1];
        
        if(vyhledavani == null) {
            schema.find({Predmet: predmet}, 'Nadpis Hodina', async(err, data) => {
                if(data){
                    let list = "";

                    data.forEach((rovnice) => {
                        list = list + `\n> **${rovnice.get('Nadpis')}** (${rovnice.get('Hodina')} hodina)`;
                    })

                    const embed = new discord.EmbedBuilder()
                    .setTitle(`**${predmet}**`)
                    .setDescription(`${list}`)
                    .setColor(`#b71225`);
                    command.reply({embeds: [embed]});

                }
            })
        } else {

        schema.find({Predmet: predmet}, async (err, data) => {
        let nadpis;
        let hodina
        let ZAPIS;
        let i = 0;
            await data.forEach(zapis => {
                if(zapis.toString().slice(50).includes(vyhledavani)){
                    nadpis = zapis.Nadpis;
                    hodina = zapis.Hodina;                    
                    ZAPIS = zapis.Zapis;
                    i++
                };
            })
            if(i > 0) {
                const embed = new discord.EmbedBuilder()
                .setTitle(`**${nadpis}**`)
                .setDescription(`> **Hodina:** ${hodina} \n> **Zápis:** ${ZAPIS}`)
                .setColor(`#b71225`);
        
                command.reply({embeds: [embed]});
            } if(i <= 0) {
                command.reply({content: "Nevedu", ephemeral: true});
            }
        })
        }
    }
}