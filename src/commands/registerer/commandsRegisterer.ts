import 'reflect-metadata';
import { Injectable } from 'injection-js';
import { ACommand } from '../handlers/command';
import { HelpCommand } from '../handlers/help';
import { FAQCommand } from '../handlers/faq';
import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import * as dotenv from 'dotenv';

@Injectable()
export class CommandsRegisterer {
	private _commandNames = [
		HelpCommand.NAME,
		FAQCommand.NAME
	]

	private rest: REST;
	private _commands: Array<ACommand>;

	constructor() {
		dotenv.config();

		this.rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

		this._commands = [];
		for (let i = 0; i < this._commandNames.length; i++) {
			let command: ACommand;
			switch (this._commandNames[i]) {
				case HelpCommand.NAME:
					command = new HelpCommand();
					break;
				case FAQCommand.NAME:
					command = new FAQCommand();
					break;
			}
			if (command == null) {
				continue;
			}
			this._commands.push(command);
		}
	}

	public get commands() {
		return this._commands;
	}

	public run(): Promise<any> {
		console.log(`Started refreshing ${this._commandNames.length} application (/) commands.`);
		return this.rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: this._commands.map(_commands => _commands.data) },
		);
	}
}
