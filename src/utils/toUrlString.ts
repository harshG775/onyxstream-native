export function toUrlString(input: string) {
    // Replace spaces with hyphens, convert to lowercase, and remove unsafe characters
    let formatted = input.replace(/\s/g, "-").toLowerCase();
    // Remove unsafe characters (keep alphanumeric, hyphen, underscore)
    formatted = formatted.replace(/[^\w-]+/g, "");
    // Trim leading/trailing hyphens and replace consecutive hyphens with a single hyphen
    formatted = formatted.replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");

    return formatted;
}
