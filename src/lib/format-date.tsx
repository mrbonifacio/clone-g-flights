export const formatDate = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
    return date.toISOString().split('T')[0]; // Pega somente a parte da data (YYYY-MM-DD)
};
