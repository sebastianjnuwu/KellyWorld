import colors from 'colors';

export default {
	async exec(client, node) {
		console.log(
			colors.brightGreen('• ') +
				`Vulkava is connected to the node "${node.identifier}"`,
		);
	},
	name: 'nodeConnect',
	type: 'vulkava',
};
