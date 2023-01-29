import { SlashCommandBuilder, Interaction, CommandInteraction } from 'discord.js';
import { ACommand } from './command';

export class FAQCommand extends ACommand {
	public static NAME = 'faq';
	public static DESCRIPTION = 'Frequently Asked Questions';

	public name = FAQCommand.NAME;

	constructor() {
		super();
		this.data = new SlashCommandBuilder()
			.setName(FAQCommand.NAME)
			.setDescription(FAQCommand.DESCRIPTION)
	}

	public execute(interaction: Interaction) {
		const commandInteraction = interaction as CommandInteraction;
		try {
			commandInteraction.reply(
				`Here's a list of frequently asked questions:
				\n**Who are you?**
				I'm a template, I'm here to propose you a solution to develop your own Discord bot in TypeScript.
				\n**How the commands work?**
				Type "/" followed by a keyword I know. For more info, type "/help".
				\n**What's the meaning of life the universe and everything?**
				72.
				\n**Sans blague, vous trouvez pas que c'est paradoxal ?**
				Ouais, c'est pas faux.`,
			);
		}
		catch (error) {
			console.error(error);
		}
	}
}
