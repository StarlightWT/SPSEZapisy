const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require('mongoose');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations ],
    presence: { status: 'idle', activities: [{ name: `Zapinam se!` }] }
});

require('dotenv').config();


//public variables
client.aliases = new Collection();
client.commands = new Collection();

client.on('ready', async() => {
    console.log("SPSEZapisy is active!");
    client.user.setPresence({status: "online", activities: [{
        name: `Aktivni!`
    }] })
});

//Register slash commands
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

async function registerCommands(){
    // Slash Commands
    const slashCommands = await globPromise(
        `./commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.commands.set(file.name, file);

        if(["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });

    client.on("ready", async () => {
        await client.guilds.cache.get(process.env.server).commands.set(arrayOfSlashCommands);
    });
    


    console.log("Commands sucesfully registered")
};
registerCommands()

//Load commands
loadCommands()
function loadCommands(){
    ["command"].forEach(() => {
    require('./src/commandHandler.js')(client);
})};

//Reply to commands
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) { //Is it a command?
        const cmd = await client.commands.get(interaction.commandName); //Get the command

        if (!cmd) //If command is missing
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    };
});

//Connect to database
mongoose.connect(process.env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected sucesfully!")
});

client.login(process.env.token);