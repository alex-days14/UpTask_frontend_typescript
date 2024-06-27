export function formatDate(isoString: string) : string{
    const date = new Date(isoString).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return date
}