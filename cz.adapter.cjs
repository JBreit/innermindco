exports.prompter = async (inquirer, commit) => {
  const { prompter } = await import('@commitlint/cz-commitlint');

  prompter(inquirer, commit);
};
