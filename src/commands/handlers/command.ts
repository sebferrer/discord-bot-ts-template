import { Interaction } from "discord.js";

export abstract class ACommand {
    data: any;
    description: string;
    name: string;

    public execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;
    }
}