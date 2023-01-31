export const getArgs = (args) => {
    const [executer, file, ...rest] = args;
    return rest.reduce((map, argument, index, array) => {
        if (argument.charAt(0) === "-") {
            index === array.length - 1
                ? (map[argument.substring(1)] = true)
                : array[index + 1].charAt(0) !== "-"
                    ? (map[argument.substring(1)] = array[index + 1])
                    : (map[argument.substring(1)] = true);
        }
        return map;
    }, {});
};
