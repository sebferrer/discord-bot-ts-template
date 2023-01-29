import { SlashCommandBuilder, Interaction, CommandInteraction } from 'discord.js';
import { ACommand } from './command';

export class HelpCommand extends ACommand {
	public static NAME = 'help';
	public static DESCRIPTION = 'Toute l\'aide dont tu as besoin pour utiliser le bot !';

	public name = HelpCommand.NAME;

	constructor() {
		super();
		this.data = new SlashCommandBuilder()
			.setName(HelpCommand.NAME)
			.setDescription(HelpCommand.DESCRIPTION)
	}

	public execute(interaction: Interaction) {
		const commandInteraction = interaction as CommandInteraction;
		try {
			commandInteraction.reply(
				`Here's a list of the different commands (starting with " / ") available : 
				- **help** : Show the list of the available commands.
				- **faq** : I'll answer with the list of different questions that I'm often asked.`,
			);
		}
		catch (error) {
			console.error(error);
		}
	}
}
