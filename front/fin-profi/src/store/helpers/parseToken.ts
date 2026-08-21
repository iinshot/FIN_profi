type Token<T> = {
    header: string,
    payload: T,
    signature: string
}

export function parseToken<T>(token: string): Token<T> {
    const data = token.split('.')

    return {
        header: data[0],
        payload: JSON.parse(atob(data[1])) as T,
        signature: data[2]
    }
}