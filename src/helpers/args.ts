export const getArgs = (args: string[]): Record<string, boolean | string> => {
	const [executer, file, ...rest] = args;
	return rest.reduce(
		(map: Record<string, string | boolean>, argument: string, index: number, array: string[]) => {
			if (argument.charAt(0) === '-') {
				index === array.length - 1
					? (map[argument.substring(1)] = true)
					: array[index + 1].charAt(0) !== '-'
					? (map[argument.substring(1)] = array[index + 1])
					: (map[argument.substring(1)] = true);
			}
			return map;
		},
		{},
	);
};
