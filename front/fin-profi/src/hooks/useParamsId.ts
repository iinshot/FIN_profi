import { useParams } from 'react-router'

export function useParamsId(name: string) {
    const id = useParams()[name]

    return parseInt(id!)
}