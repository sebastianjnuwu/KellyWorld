import colors from 'colors';

export default {
	async exec(client, node) {
		console.log(colors.brightRed('• ') + `Vulkava could not connect to node "${node.identifier}"`);
	},
	name: 'error',
	type: 'vulkava',
};
