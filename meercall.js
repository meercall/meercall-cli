const package = require('./package.json');
const program = require('commander');
const { pull } = require('./logic');

program
  .version(package.version)
  .description(package.description);

program
  .command('pull <tag> <filepath>')
  .alias('p')
  .description('Pull Meercall configs and secrets and save to filepath. Acceptable file extensions: .env, .json, .xml')
  .action((tag, filepath, cmdObj) => {
    pull(tag, filepath, cmdObj);
  });

program.parse(process.argv);