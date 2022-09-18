const schema = require('../../models/rovnice.js');
const mongoose = require('mongoose');
const discord = require('discord.js');

module.exports = {
    name: "rovnice",
    description: "Najdi rovnici",
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
            name: "vyhledat",
            description: "Název rovnice, co vypočítá nebo část rovnice",
            type: 3,
            required: false,
        }
    ],
    dm_permission: false,

    run: async (client, command, args) => {
        const predmet = args[0];
        const vyhledavani = args[1];
        
        if(vyhledavani == null) {
            schema.find({Predmet: predmet}, 'Nazev', async(err, data) => {
                if(data){
                    let list = "";

                    data.forEach((rovnice) => {
                        list = list + "\n> " + rovnice.get('Nazev');
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
        let ROVNICE;
        let vypocita;
        let i = 0;
            await data.forEach(rovnice => {
                if(rovnice.toString().slice(50).includes(vyhledavani)){
                    nadpis = rovnice.Nazev;
                    ROVNICE = rovnice.Rovnice;
                    vypocita = rovnice.Vypocita;
                    i++
                };
            })
            if(i > 0) {
                const embed = new discord.EmbedBuilder()
                .setTitle(`**${nadpis}**`)
                .setDescription(`> **Rovnice:** ${ROVNICE} \n> **Vypočítá:** ${vypocita}`)
                .setColor(`#b71225`);
        
                command.reply({embeds: [embed]});
            } if(i <= 0) {
                command.reply({content: "Nevedu", ephemeral: true});
            }
        })
        }
    }
}