import colors from 'colors';

export default {
  name: 'nodeConnect',
  type: 'vulkava',
  async exec(client, node) {

   console.log(colors.brightGreen('• ') + `Vulkava is connected to the node "${node.identifier}"`);

  },
};