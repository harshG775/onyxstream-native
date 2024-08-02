export const purifyDescriptionToArray = (str: string) => {
    // Replace <br> tags with a unique delimiter for splitting
    let purifiedString = str.replace(/<br\s*\/?>/gi, "\n--DELIMITER--");

    // Replace <b> tags with React Native's text formatting
    purifiedString = purifiedString.replace(/<b>(.*?)<\/b>/gi, "*$1*");

    // Replace <i> tags with React Native's text formatting
    purifiedString = purifiedString.replace(/<i>(.*?)<\/i>/gi, "_$1_");

    // Replace lists with React Native list formatting
    purifiedString = purifiedString.replace(
        /- (.*?)\n--DELIMITER--/gi,
        "\n• $1\n",
    );

    // Split by delimiter
    const stringArray = purifiedString
        .split("\n--DELIMITER--")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

    return stringArray;
};
